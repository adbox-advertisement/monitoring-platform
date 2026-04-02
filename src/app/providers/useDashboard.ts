import { useEffect, useState } from "react";
import ApiService from "../../helpers/api.service";
import endpoints from "../../helpers/endpoints";
import { socketService } from "../../sockets/connections";
import { ConnectionEnum } from "../../sockets/enum";
import { useSocketStatus } from "./socket-provider";
import { initialServiceCards } from "#/features/dashboard/dashboard.data";
import type {
  AuditLogPayload,
  LogItem,
  LogVariant,
  ServiceCardState,
  ServiceLogPayload,
  ServiceStatus,
  TranscodingState,
} from "#/features/dashboard/dashboard.types";

const MAX_LOGS = 8;
const MAX_BARS = 20;
const AUDIT_CARD_ID = "api-gateway";

export interface DashboardStats {
  totalEvents: number;
  totalErrors: number;
  avgLatency: number | null;
  apiRequests: number;
}

function normalizeServiceId(value: string | undefined | null) {
  return value?.trim().toLowerCase().replace(/[_\s]+/g, "-") ?? "";
}

function extractItems<T>(input: unknown): T[] {
  if (Array.isArray(input)) {
    return input as T[];
  }

  if (input && typeof input === "object") {
    const record = input as Record<string, unknown>;
    if (Array.isArray(record.data)) return record.data as T[];
    if (Array.isArray(record.items)) return record.items as T[];
    if (Array.isArray(record.results)) return record.results as T[];
  }

  return [];
}

function toTime(iso?: string | null) {
  const date = iso ? new Date(iso) : new Date();
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function inferVariant(level: string | undefined, message: string, audit = false): LogVariant {
  if (audit) return "audit";
  const normalizedLevel = `${level ?? ""}`.toLowerCase();
  if (normalizedLevel === "error" || /error|fail|exception/i.test(message)) {
    return "err";
  }
  if (normalizedLevel === "warn" || /warn/i.test(message)) {
    return "warn";
  }
  return "ok";
}

function variantToStatus(variant: LogVariant): LogItem["status"] {
  if (variant === "err") return "ERROR";
  if (variant === "warn") return "WARN";
  return "SUCCESS";
}

function variantToCardStatus(variant: LogVariant): ServiceStatus {
  if (variant === "err") return "error";
  if (variant === "warn") return "warning";
  return "healthy";
}

function variantToBarHeight(variant: LogVariant) {
  if (variant === "err") return 94;
  if (variant === "warn") return 72;
  if (variant === "audit") return 58;
  return 42;
}

function baseBars() {
  return Array.from({ length: MAX_BARS }, (_, index) => 26 + ((index % 5) * 8));
}

function mergeBars(logs: LogItem[]) {
  const fromLogs = logs
    .slice(0, MAX_BARS)
    .reverse()
    .map((log) => variantToBarHeight(log.variant));

  if (fromLogs.length >= MAX_BARS) {
    return fromLogs;
  }

  return [...baseBars().slice(0, MAX_BARS - fromLogs.length), ...fromLogs];
}

function deriveCardStatus(logs: LogItem[], fallback: ServiceStatus) {
  if (logs.some((log) => log.variant === "err")) return "error";
  if (logs.some((log) => log.variant === "warn")) return "warning";
  if (logs.length > 0) return "healthy";
  return fallback;
}

function createServiceLogItem(payload: ServiceLogPayload): LogItem {
  const variant = inferVariant(payload.level, payload.message);
  return {
    time: toTime(payload.timestamp),
    text: payload.message,
    svcName: payload.internalServiceName ?? payload.application,
    variant,
    status: variantToStatus(variant),
  };
}

function createAuditLogItem(payload: AuditLogPayload): LogItem {
  const text = [
    payload.outcome?.toUpperCase(),
    payload.action,
    payload.durationMs != null ? `(${payload.durationMs}ms)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    time: toTime(payload.timestamp),
    text,
    svcName: "audit",
    variant: "audit",
    status: payload.outcome === "failure" ? "ERROR" : "SUCCESS",
  };
}

function emptyCards(): ServiceCardState[] {
  return initialServiceCards.map((card) => ({
    ...card,
    logs: [],
    chartBars: baseBars(),
    errorCount: 0,
    eventCount: 0,
  }));
}

function detectTranscoding(message: string, current: TranscodingState): TranscodingState {
  if (/video\.resolutions/i.test(message)) {
    return {
      "240p": "pending",
      "360p": "pending",
      "480p": "pending",
      "720p": "pending",
      "1080p": "pending",
    };
  }

  const next = { ...current };

  (["240p", "360p", "480p", "720p", "1080p"] as const).forEach((resolution) => {
    if (new RegExp(`processing.*${resolution}`, "i").test(message)) {
      next[resolution] = "active";
    }
    if (new RegExp(`${resolution} done|resolution ${resolution} done`, "i").test(message)) {
      next[resolution] = "done";
    }
  });

  return next;
}

export function useDashboard() {
  const { status } = useSocketStatus();
  const [cards, setCards] = useState<ServiceCardState[]>(emptyCards);
  const [auditDurations, setAuditDurations] = useState<number[]>([]);
  const [transcoding, setTranscoding] = useState<TranscodingState>({
    "240p": "pending",
    "360p": "pending",
    "480p": "pending",
    "720p": "pending",
    "1080p": "pending",
  });

  useEffect(() => {
    let cancelled = false;

    async function seedDashboard() {
      const seededCards = await Promise.all(
        initialServiceCards.map(async (card) => {
          const requests = [
            ApiService.get_api(endpoints.monitoring.getServices(card.id)),
            ApiService.get_api(endpoints.monitoring.getErrors(card.id)),
          ];

          if (card.id === AUDIT_CARD_ID) {
            requests.push(ApiService.get_api(endpoints.monitoring.getAudits(card.id)));
          }

          try {
            const responses = await Promise.all(requests);
            const serviceItems = extractItems<ServiceLogPayload>(responses[0].data);
            const errorItems = extractItems<ServiceLogPayload>(responses[1].data);
            const auditItems =
              card.id === AUDIT_CARD_ID && responses[2]
                ? extractItems<AuditLogPayload>(responses[2].data)
                : [];

            const logs = [
              ...serviceItems.map(createServiceLogItem),
              ...errorItems.map(createServiceLogItem),
              ...auditItems.map(createAuditLogItem),
            ]
              .sort((a, b) => b.time.localeCompare(a.time))
              .slice(0, MAX_LOGS);

            if (card.id === AUDIT_CARD_ID && auditItems.length > 0) {
              const durations = auditItems
                .map((item) => item.durationMs)
                .filter((value): value is number => typeof value === "number");
              if (!cancelled && durations.length > 0) {
                setAuditDurations((current) => [...current, ...durations].slice(-60));
              }
            }

            return {
              ...card,
              logs,
              chartBars: mergeBars(logs),
              errorCount: logs.filter((log) => log.variant === "err").length,
              eventCount: logs.length,
              status: deriveCardStatus(logs, card.status),
            };
          } catch {
            return {
              ...card,
              logs: [],
              chartBars: baseBars(),
              errorCount: 0,
              eventCount: 0,
            };
          }
        }),
      );

      if (!cancelled) {
        setCards(seededCards);
      }
    }

    void seedDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== ConnectionEnum.connected) {
      return;
    }

    const socket = socketService.socket;
    if (!socket) {
      return;
    }

    function updateCard(cardId: string, log: LogItem, subtitle?: string) {
      setCards((currentCards) =>
        currentCards.map((card) => {
          if (card.id !== cardId) {
            return card;
          }

          const logs = [log, ...card.logs].slice(0, MAX_LOGS);
          const errorCount =
            log.variant === "err" ? card.errorCount + 1 : card.errorCount;

          return {
            ...card,
            logs,
            subtitle: subtitle ?? card.subtitle,
            chartBars: mergeBars(logs),
            errorCount,
            eventCount: card.eventCount + 1,
            status:
              log.variant === "audit"
                ? card.status
                : variantToCardStatus(log.variant),
          };
        }),
      );
    }

    function handleServiceLog(payload: ServiceLogPayload) {
      const cardId = normalizeServiceId(payload.application);
      if (!cardId) {
        return;
      }

      const log = createServiceLogItem(payload);
      updateCard(cardId, log);

      if (cardId === "resolutions") {
        setTranscoding((current) => detectTranscoding(payload.message, current));
      }
    }

    function handleErrorLog(payload: ServiceLogPayload) {
      const cardId = normalizeServiceId(payload.application);
      if (!cardId) {
        return;
      }

      const log: LogItem = {
        time: toTime(payload.timestamp),
        text: payload.message,
        svcName: payload.internalServiceName ?? payload.application,
        variant: "err",
        status: "ERROR",
      };

      updateCard(cardId, log);
    }

    function handleAuditLog(payload: AuditLogPayload) {
      const log = createAuditLogItem(payload);
      updateCard(AUDIT_CARD_ID, log);

      if (typeof payload.durationMs === "number") {
        setAuditDurations((current) => [...current, payload.durationMs].slice(-60));
      }
    }

    socketService.subscribe("ALL");
    socket.on(endpoints.socketEvents.listenEvents.logService, handleServiceLog);
    socket.on(endpoints.socketEvents.listenEvents.logError, handleErrorLog);
    socket.on(endpoints.socketEvents.listenEvents.logAudit, handleAuditLog);

    return () => {
      socketService.unsubscribe("ALL");
      socket.off(endpoints.socketEvents.listenEvents.logService, handleServiceLog);
      socket.off(endpoints.socketEvents.listenEvents.logError, handleErrorLog);
      socket.off(endpoints.socketEvents.listenEvents.logAudit, handleAuditLog);
    };
  }, [status]);

  const totalEvents = cards.reduce((sum, card) => sum + card.eventCount, 0);
  const totalErrors = cards.reduce((sum, card) => sum + card.errorCount, 0);
  const avgLatency =
    auditDurations.length > 0
      ? Math.round(
          auditDurations.reduce((sum, duration) => sum + duration, 0) /
            auditDurations.length,
        )
      : null;

  return {
    cards,
    transcoding,
    stats: {
      totalEvents,
      totalErrors,
      avgLatency,
      apiRequests: auditDurations.length,
    } satisfies DashboardStats,
  };
}
