import { ServiceLogs } from "../../components/services/ServiceLogs";
import type { LogItem } from "../../components/services/ServiceCard";
import { StatCard } from "../../components/stats/StatCard";
import { Badge } from "../../components/ui/Badge";
import { Card, CardTitle } from "../../components/ui/Card";

const logs: LogItem[] = [
  {
    time: "14:22:10.441",
    status: "SUCCESS",
    text: "Push batch dispatched to 12,440 devices · campaign:flash_sale_ghana",
    variant: "ok",
  },
  {
    time: "14:22:04.118",
    status: "WARN",
    text: "SMS carrier latency increased to 4.2s · provider:africa_tier1",
    variant: "warn",
  },
  {
    time: "14:21:58.902",
    status: "SUCCESS",
    text: "Webhook delivery confirmed · endpoint:/callbacks/campaign_status",
    variant: "ok",
  },
  {
    time: "14:21:54.020",
    status: "ERROR",
    text: "Email bounce threshold exceeded for segment:new_signups · 2.8%",
    variant: "err",
  },
  {
    time: "14:21:49.777",
    status: "SUCCESS",
    text: "Template cache refreshed for locale set: en, fr, sw",
    variant: "ok",
  },
  {
    time: "14:21:45.305",
    status: "SUCCESS",
    text: "Retry worker recovered 184 pending push notifications",
    variant: "ok",
  },
];

export function NotificationView() {
  return (
    <div className="view">
      <div className="page-header">
        <div>
          <div className="page-title">Notification</div>
          <div className="page-sub">
            Push delivery · SMS gateways · Email templates
          </div>
        </div>
        <Badge variant="warning">WARNING — Delivery Degradation</Badge>
      </div>

      <div className="stats-row">
        <StatCard
          label="Messages / min"
          value="18,240"
          badge="+11%"
          badgeVariant="up"
        />
        <StatCard
          label="Push Success Rate"
          value="98.7%"
          badge="Healthy"
          badgeVariant="stable"
        />
        <StatCard
          label="SMS Retry Queue"
          value="184"
          badge="Elevated"
          badgeVariant="warn"
        />
        <StatCard
          label="Email Bounce Rate"
          value="2.8%"
          badge="Review"
          badgeVariant="down"
        />
      </div>

      <div className="detail-grid">
        <Card>
          <CardTitle>Channel Health</CardTitle>
          <div className="metric-row">
            <span className="metric-key">Push Gateway</span>
            <span className="metric-val green">● 98.7% delivered</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">SMS Provider</span>
            <span className="metric-val yellow">● Latency 4.2s</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Email Relay</span>
            <span className="metric-val red">● Bounce spike 2.8%</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Webhook Callbacks</span>
            <span className="metric-val green">● 100% acknowledged</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Template Renderer</span>
            <span className="metric-val green">● Warm cache</span>
          </div>
        </Card>

        <Card>
          <CardTitle>Queue Breakdown</CardTitle>
          <div className="metric-row">
            <span className="metric-key">Push Pending</span>
            <span className="metric-val green">42</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">SMS Retries</span>
            <span className="metric-val yellow">184</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Email Deferred</span>
            <span className="metric-val red">67</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Dead-letter Queue</span>
            <span className="metric-val">9</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Recovered Last Hour</span>
            <span className="metric-val green">184</span>
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
