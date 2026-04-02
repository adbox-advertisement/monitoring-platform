import { useDashboard } from "#/app/providers/useDashboard";
import { ServiceCard } from "../../components/services/ServiceCard";
import { StatCard } from "../../components/stats/StatCard";

export function DashboardView() {
  const { cards, stats, transcoding } = useDashboard();

  return (
    <div className="view">
      <div className="stats-row">
        <StatCard label="Total events" value={String(stats.totalEvents)} />
        <StatCard
          label="Errors"
          value={String(stats.totalErrors)}
          badge={stats.totalErrors === 0 ? "clean" : `${stats.totalErrors} err`}
          badgeVariant={stats.totalErrors === 0 ? "up" : "down"}
        />
        <StatCard
          label="Avg latency"
          value={stats.avgLatency != null ? `${stats.avgLatency}ms` : "—"}
        />
        <StatCard label="API requests" value={String(stats.apiRequests)} />
      </div>

      <div className="services-grid">
        {cards.map((card) => (
          <ServiceCard
            key={card.id}
            {...card}
            transcoding={card.id === "resolutions" ? transcoding : undefined}
          />
        ))}
      </div>
    </div>
  );
}
