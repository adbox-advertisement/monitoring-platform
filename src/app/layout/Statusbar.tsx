import { useSocketStatus } from "../providers/socket-provider";
import { ConnectionEnum } from "#/sockets/enum";

export function Statusbar() {
  const { status } = useSocketStatus();
  const statusLabel =
    status === ConnectionEnum.connected
      ? "REAL-TIME STREAM CONNECTED"
      : status === ConnectionEnum.reconnecting
        ? "REAL-TIME STREAM RECONNECTING"
        : status === ConnectionEnum.connecting
          ? "REAL-TIME STREAM CONNECTING"
          : "REAL-TIME STREAM DISCONNECTED";

  return (
    <div className="statusbar">
      <div className="statusbar-left">
        <div className={`statusbar-dot ${status}`} />
        {statusLabel}
      </div>
      <div className="statusbar-right">
        <div className="statusbar-item">
          NODE_CLUSTER: <span>04-B</span>
        </div>
        <div className="statusbar-item">
          LATENCY:{" "}
          <span>{status === ConnectionEnum.connected ? "14MS" : "--"}</span>
        </div>
      </div>
    </div>
  );
}
