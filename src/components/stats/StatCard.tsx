type StatBadgeVariant = "up" | "down" | "stable" | "opt" | "warn";

interface StatCardProps {
  label: string;
  value: string;
  badge?: string;
  badgeVariant?: StatBadgeVariant;
}

export function StatCard({
  label,
  value,
  badge,
  badgeVariant = "stable",
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {value}
        {badge && <span className={`stat-badge ${badgeVariant}`}>{badge}</span>}
      </div>
    </div>
  );
}
