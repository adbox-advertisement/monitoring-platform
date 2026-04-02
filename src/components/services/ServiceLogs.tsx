import { LogEntry } from "../logs/LogEntry";
import type { LogItem } from "./ServiceCard";

interface ServiceLogsProps {
  logs: LogItem[];
  full?: boolean; // true = scrollable full-height panel stream
}

export function ServiceLogs({ logs, full = false }: ServiceLogsProps) {
  return (
    <div className={full ? "full-logs" : "logs"}>
      {logs.map((log, i) => (
        <LogEntry
          key={`${log.time}-${log.status}-${log.text}-${i}`}
          time={log.time}
          status={log.status}
          text={log.text}
          variant={log.variant}
        />
      ))}
    </div>
  );
}
