type LogVariant = "ok" | "warn" | "err" | "audit";
type LogStatus = "SUCCESS" | "WARN" | "ERROR";

interface LogEntryProps {
  time: string;
  status: LogStatus;
  text: string;
  variant: LogVariant;
}

const statusClass: Record<LogStatus, string> = {
  SUCCESS: "success",
  WARN: "warn",
  ERROR: "error",
};

export function LogEntry({ time, status, text, variant }: LogEntryProps) {
  return (
    <div className={`log-entry ${variant === "audit" ? "ok" : variant}`}>
      <div className="log-meta">
        {time}{" "}
        <span className={`log-status ${statusClass[status]}`}>{status}</span>
      </div>
      <div className={`log-text${variant === "err" ? " highlight" : ""}`}>
        {text}
      </div>
    </div>
  );
}
