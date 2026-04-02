import { StatCard } from "../../components/stats/StatCard";
import { Card, CardTitle } from "../../components/ui/Card";
import { ResolutionTable } from "../../components/tables/ResolutionTable";
import type { Incident } from "../../components/tables/ResolutionTable";

const incidents: Incident[] = [
  {
    id: "INC-0091",
    title: "FFMPEG Protocol error on stream_4",
    service: "Transcoding",
    priority: "P1",
    status: "OPEN",
    opened: "14:22:08",
  },
  {
    id: "INC-0090",
    title: "Rate limit spike for client:ID_882",
    service: "API Gateway",
    priority: "P2",
    status: "OPEN",
    opened: "14:21:55",
  },
  {
    id: "INC-0089",
    title: "Billing reconciler latency above threshold",
    service: "AdBox Backend",
    priority: "P2",
    status: "OPEN",
    opened: "14:21:51",
  },
  {
    id: "INC-0088",
    title: "SMS delivery failures · carrier rejection",
    service: "Notification",
    priority: "P3",
    status: "OPEN",
    opened: "14:21:50",
  },
  {
    id: "INC-0087",
    title: "Transcoding queue depth exceeded 120",
    service: "Transcoding",
    priority: "P2",
    status: "RESOLVED",
    opened: "13:55:00",
  },
  {
    id: "INC-0086",
    title: "Redis cache eviction on retargeting pool",
    service: "AdBox Backend",
    priority: "P3",
    status: "RESOLVED",
    opened: "13:40:12",
  },
  {
    id: "INC-0085",
    title: "API gateway upstream timeout on /analytics",
    service: "API Gateway",
    priority: "P2",
    status: "RESOLVED",
    opened: "13:20:44",
  },
  {
    id: "INC-0084",
    title: "Push notification batch delayed 4 min",
    service: "Notification",
    priority: "P3",
    status: "RESOLVED",
    opened: "12:08:31",
  },
];

export function ResolutionsView() {
  return (
    <div className="view">
      <div className="page-header">
        <div>
          <div className="page-title">Resolutions</div>
          <div className="page-sub">
            Incident tracker · Postmortems · On-call escalations
          </div>
        </div>
        <span className="tag">4 Open · 12 Resolved this week</span>
      </div>

      <div className="stats-row">
        <StatCard
          label="Open Incidents"
          value="4"
          badge="Active"
          badgeVariant="warn"
        />
        <StatCard
          label="MTTR (avg)"
          value="14m"
          badge="-3m"
          badgeVariant="up"
        />
        <StatCard
          label="Resolved (7d)"
          value="12"
          badge="All Clear"
          badgeVariant="stable"
        />
        <StatCard
          label="P1 Incidents"
          value="1"
          badge="Active"
          badgeVariant="down"
        />
      </div>

      <Card>
        <CardTitle>Active &amp; Recent Incidents</CardTitle>
        <ResolutionTable incidents={incidents} />
      </Card>

      <div className="detail-grid">
        <Card>
          <CardTitle>On-Call This Week</CardTitle>
          <div className="metric-row">
            <span className="metric-key">Primary Engineer</span>{" "}
            <span className="metric-val green">Ama K.</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Secondary</span>{" "}
            <span className="metric-val">Kweku O.</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Escalation Lead</span>{" "}
            <span className="metric-val">Abena M.</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Response SLA</span>{" "}
            <span className="metric-val green">P1: 5m · P2: 15m</span>
          </div>
        </Card>
        <Card>
          <CardTitle>Resolution Time Distribution</CardTitle>
          <div className="metric-row">
            <span className="metric-key">Under 5 min</span>{" "}
            <span className="metric-val green">4 incidents (33%)</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">5 - 15 min</span>{" "}
            <span className="metric-val green">5 incidents (42%)</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">15 - 30 min</span>{" "}
            <span className="metric-val yellow">2 incidents (17%)</span>
          </div>
          <div className="metric-row">
            <span className="metric-key">Over 30 min</span>{" "}
            <span className="metric-val red">1 incident (8%)</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
