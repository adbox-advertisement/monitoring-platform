import type {
  ServiceCardState,
  TranscodingState,
} from "#/features/dashboard/dashboard.types";
import { Badge } from "../ui/Badge";
import { ServiceChart } from "./ServiceChart";
import { ServiceLogs } from "./ServiceLogs";
import { TranscodingTracker } from "./TranscodingTracker";

export type { LogItem } from "#/features/dashboard/dashboard.types";

interface ServiceCardProps extends ServiceCardState {
  transcoding?: TranscodingState;
}

export function ServiceCard({ transcoding, ...props }: ServiceCardProps) {
  return (
    <div
      className={`service-card${props.status === "warning" ? " warn-border" : ""}`}
    >
      <div className="service-header">
        <div className="service-info">
          <div className={`service-icon ${props.iconColor}`}>{props.icon}</div>
          <div>
            <div className="service-name">{props.name}</div>
            <div className="service-avail">{props.subtitle}</div>
          </div>
        </div>
        <Badge variant={props.status}>{props.status.toUpperCase()}</Badge>
      </div>

      <ServiceChart heights={props.chartBars} color={props.chartColor} />

      {/* Only shown on the resolutions card */}
      {props.id === "resolutions" && transcoding && (
        <TranscodingTracker state={transcoding} />
      )}

      <ServiceLogs logs={props.logs} />
    </div>
  );
}
