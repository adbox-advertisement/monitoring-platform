import { StatCard } from "../../components/stats/StatCard";
import { Card, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { ServiceChart } from "../../components/services/ServiceChart";
import { ServiceLogs } from "../../components/services/ServiceLogs";
import type { LogItem } from "../../components/services/ServiceCard";

const logs: LogItem[] = [
  {
    time: "14:22:05.112",
    status: "SUCCESS",
    text: "Database query committed: transactional_id_77 · 3ms",
    variant: "ok",
  },
  {
    time: "14:22:02.889",
    status: "SUCCESS",
    text: "Campaign state updated to 'ACTIVE' · campaign_id:C_4412",
    variant: "ok",
  },
  {
    time: "14:21:59.001",
    status: "SUCCESS",
    text: "Memory cleanup routine completed · freed 142MB heap",
    variant: "ok",
  },
  {
    time: "14:21:55.400",
    status: "SUCCESS",
    text: "Ad auction resolved in 2ms · winner:advertiser_88",
    variant: "ok",
  },
  {
    time: "14:21:51.200",
    status: "WARN",
    text: "Billing reconciler latency spike: 18ms (threshold: 15ms)",
    variant: "warn",
  },
  {
    time: "14:21:48.900",
    status: "SUCCESS",
    text: "Redis cache warmed for segment:retargeting_pool_v2",
    variant: "ok",
  },
  {
    time: "14:21:45.700",
    status: "SUCCESS",
    text: "Daily budget cap checked: 88 campaigns within limits",
    variant: "ok",
  },
];

export function BackendView() {
  return (
    <div className="view">
      <div className="page-header">
        <div>
          <div className="page-title">AdBox Backend</div>
          <div className="page-sub">
            Campaign engine · Database · Ad serving logic
          </div>
        </div>
        <Badge variant="healthy">HEALTHY — 99.85% Uptime</Badge>
      </div>

      <div className="stats-row">
        <StatCard
          label="DB Queries / min"
          value="24,800"
          badge="+9%"
          badgeVariant="up"
        />
        <StatCard
          label="Active Campaigns"
          value="312"
          badge="Running"
          badgeVariant="stable"
        />
        <StatCard
          label="Memory Usage"
          value="68%"
          badge="Normal"
          badgeVariant="opt"
        />
        <StatCard
          label="DB Latency"
          value="4ms"
          badge="Good"
          badgeVariant="up"
        />
      </div>

      <div className="detail-grid">
        <Card>
          <CardTitle>Database Query Load</CardTitle>
          <ServiceChart
            size="big"
            color="blue"
            heights={[50, 65, 82, 45, 70, 88, 55, 75, 92, 60, 78, 85, 52, 95]}
          />
        </Card>
        <Card>
          <CardTitle>Service Health</CardTitle>
          <div className="metric-row">
            <span className="metric-key">Campaign State Engine</span>
            <span className="metric-val green">● Running</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">PostgreSQL Primary</span>{" "}
            <span className="metric-val green">● Connected</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Redis Cache Layer</span>{" "}
            <span className="metric-val green">● Connected</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Ad Auction Engine</span>{" "}
            <span className="metric-val green">● Running</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Billing Reconciler</span>{" "}
            <span className="metric-val yellow">● Slow (18ms)</span>
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
