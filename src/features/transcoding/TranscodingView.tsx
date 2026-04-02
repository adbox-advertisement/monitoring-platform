import { StatCard } from "../../components/stats/StatCard";
import { Card, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { ServiceChart } from "../../components/services/ServiceChart";
import { ServiceLogs } from "../../components/services/ServiceLogs";
import type { LogItem } from "../../components/services/ServiceCard";

const logs: LogItem[] = [
  {
    time: "14:22:08.552",
    status: "ERROR",
    text: "FFMPEG: Protocol error on stream_4 · worker-node-03 · job:9948",
    variant: "err",
  },
  {
    time: "14:22:01.002",
    status: "SUCCESS",
    text: "Job ID: 9942 finished encoding (1080p) · 2m34s · worker-node-01",
    variant: "ok",
  },
  {
    time: "14:21:45.120",
    status: "SUCCESS",
    text: "S3 Upload complete: assets/commercial_v4.mp4 · 84MB",
    variant: "ok",
  },
  {
    time: "14:21:40.800",
    status: "WARN",
    text: "Queue depth reached 128 · scaling threshold is 120",
    variant: "warn",
  },
  {
    time: "14:21:35.400",
    status: "SUCCESS",
    text: "Job ID: 9941 finished encoding (4K HDR) · 8m12s · worker-node-02",
    variant: "ok",
  },
  {
    time: "14:21:30.100",
    status: "ERROR",
    text: "Job 9938 failed: invalid codec parameter · h265 not supported",
    variant: "err",
  },
  {
    time: "14:21:25.700",
    status: "SUCCESS",
    text: "Thumbnail generation complete: commercial_v4 · 12 frames extracted",
    variant: "ok",
  },
];

export function TranscodingView() {
  return (
    <div className="view">
      <div className="page-header">
        <div>
          <div className="page-title">Transcoding</div>
          <div className="page-sub">
            FFMPEG worker cluster · Media processing pipeline
          </div>
        </div>
        <Badge variant="warning">WARNING — 1 Active Error</Badge>
      </div>

      <div className="stats-row">
        <StatCard
          label="Files Processing"
          value="46"
          badge="Busy"
          badgeVariant="warn"
        />
        <StatCard
          label="Queue Depth"
          value="128"
          badge="High"
          badgeVariant="warn"
        />
        <StatCard
          label="Completed Today"
          value="2,104"
          badge="+18%"
          badgeVariant="up"
        />
        <StatCard
          label="Failed Jobs"
          value="3"
          badge="↑ Review"
          badgeVariant="down"
        />
      </div>

      <div className="detail-grid">
        <Card>
          <CardTitle>Worker CPU Load</CardTitle>
          <ServiceChart
            size="big"
            color="warn"
            heights={[55, 72, 88, 65, 79, 95, 82, 100, 91, 74, 86, 60, 93, 98]}
          />
        </Card>
        <Card>
          <CardTitle>Worker Node Status</CardTitle>
          <div className="metric-row">
            <span className="metric-key">worker-node-01</span>
            <span className="metric-val green">● Encoding · 1080p</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">worker-node-02</span>
            <span className="metric-val green">● Encoding · 4K HDR</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">worker-node-03</span>
            <span className="metric-val red">● ERROR — stream_4</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">worker-node-04</span>
            <span className="metric-val green">● Encoding · 720p</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">worker-node-05</span>
            <span className="metric-val yellow">● Queued · Waiting</span>
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>Live Log Stream</CardTitle>
        <ServiceLogs logs={logs} full />
      </Card>
    </div>
  );
}
