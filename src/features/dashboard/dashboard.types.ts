export type LogVariant = "ok" | "warn" | "err" | "audit";
export type ServiceStatus = "healthy" | "warning" | "error" | "idle";
export type IconColor = "purple" | "blue" | "orange" | "teal";
export type ChartColor =
  | "blue"
  | "purple"
  | "teal"
  | "orange"
  | "accent"
  | "warn";

export type TranscodingStep = "pending" | "active" | "done";
export type TranscodingState = Record<
  "240p" | "360p" | "480p" | "720p" | "1080p",
  TranscodingStep
>;

export interface LogItem {
  time: string;
  text: string;
  svcName?: string;
  variant: LogVariant;
  status: "SUCCESS" | "WARN" | "ERROR";
}

export interface ServiceCardState {
  id: string;
  icon: string;
  iconColor: IconColor;
  name: string;
  subtitle: string;
  status: ServiceStatus;
  chartBars: number[];
  chartColor: ChartColor;
  logs: LogItem[];
  errorCount: number;
  eventCount: number;
}

// Matches real API payload from socket
export interface ServiceLogPayload {
  _id?: string;
  application: string;
  level: "info" | "debug" | "warn" | "error";
  message: string;
  internalServiceName?: string;
  traceId?: string | null;
  userId?: string | null;
  timestamp: string;
}

// log:audit socket payload
export interface AuditLogPayload {
  _id?: string;
  application: string;
  action: string;
  outcome: "success" | "failure";
  durationMs: number;
  requestBody?: Record<string, unknown>;
  userId?: string | null;
  email?: string | null;
  timestamp: string;
}
