import { StatCard } from "../../components/stats/StatCard";
import { Card, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { ServiceChart } from "../../components/services/ServiceChart";
import { ServiceLogs } from "../../components/services/ServiceLogs";
import type { LogItem } from "../../components/services/ServiceCard";

const logs: LogItem[] = [
  {
    time: "14:22:01.442",
    status: "SUCCESS",
    text: "GET /v1/auth/token → 200 OK (12ms) — client:mobile_sdk_v3",
    variant: "ok",
  },
  {
    time: "14:21:58.118",
    status: "SUCCESS",
    text: "Route optimized for cluster:us-east-1 · new weight=0.72",
    variant: "ok",
  },
  {
    time: "14:21:55.002",
    status: "WARN",
    text: "Rate limit exceeded for client:ID_882 — throttled to 100rps",
    variant: "warn",
  },
  {
    time: "14:21:50.402",
    status: "SUCCESS",
    text: "Cache hit on resource:ads_manifest_v2 · TTL=3600s",
    variant: "ok",
  },
  {
    time: "14:21:47.210",
    status: "SUCCESS",
    text: "POST /v1/campaign/update → 201 Created (14ms)",
    variant: "ok",
  },
  {
    time: "14:21:44.900",
    status: "SUCCESS",
    text: "SSL certificate renewed for gateway.adbox.io — expires 2027-03-22",
    variant: "ok",
  },
  {
    time: "14:21:40.310",
    status: "WARN",
    text: "Upstream timeout on /v1/analytics/report — retried, resolved",
    variant: "warn",
  },
  {
    time: "14:21:38.100",
    status: "SUCCESS",
    text: "Health check passed — all 14 clusters responding",
    variant: "ok",
  },
];

export function ApiGatewayView() {
  return (
    <div className="view">
      <div className="page-header">
        <div>
          <div className="page-title">API Gateway</div>
          <div className="page-sub">
            Route management · Load balancing · Auth layer
          </div>
        </div>
        <Badge variant="healthy">HEALTHY — 99.98% Uptime</Badge>
      </div>

      <div className="stats-row">
        <StatCard
          label="Requests / sec"
          value="8,412"
          badge="+6%"
          badgeVariant="up"
        />
        <StatCard
          label="Avg Response"
          value="12ms"
          badge="Fast"
          badgeVariant="opt"
        />
        <StatCard
          label="Cache Hit Rate"
          value="94.2%"
          badge="+2%"
          badgeVariant="up"
        />
        <StatCard
          label="4xx Errors"
          value="0.8%"
          badge="Monitor"
          badgeVariant="warn"
        />
      </div>

      <div className="detail-grid">
        <Card>
          <CardTitle>Request Throughput (last 14 intervals)</CardTitle>
          <ServiceChart
            size="big"
            color="accent"
            heights={[45, 62, 78, 50, 68, 85, 40, 72, 90, 55, 75, 82, 48, 95]}
          />
        </Card>
        <Card>
          <CardTitle>Route Metrics</CardTitle>
          <div className="metric-row">
            <span className="metric-key">/v1/auth/token</span>{" "}
            <span className="metric-val green">200 OK · 11ms</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">/v1/ads/serve</span>{" "}
            <span className="metric-val green">200 OK · 9ms</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">/v1/campaign/update</span>{" "}
            <span className="metric-val green">201 · 14ms</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">/v1/analytics/report</span>
            <span className="metric-val yellow">200 · 38ms</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">/v1/user/session</span>{" "}
            <span className="metric-val red">429 · Rate Limited</span>
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
