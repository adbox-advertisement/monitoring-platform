import { Link, useRouterState } from "@tanstack/react-router";
const GridIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const FlagIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

export const Sidebar = () => {
  const { location } = useRouterState();

  const nav = [
    { to: "/", label: "Dashboard", icon: GridIcon },
    { to: "/api-gateway", label: "API Gateway", icon: LayersIcon },
    { to: "/adbox-backend", label: "AdBox Backend", icon: ClockIcon },
    { to: "/transcoding", label: "Transcoding", icon: CalendarIcon },
    { to: "/notification", label: "Notification", icon: BellIcon },
    { to: "/resolutions", label: "Resolutions", icon: FlagIcon },
  ];

  return (
    <aside className="sidebar">
      {/* BRAND */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <img src="/logo.png" alt="AdBox logo" className="brand-mark" />
        </div>

        <div className="brand-info">
          <div className="name">Service Monitor</div>
          <div className="status">ALL SYSTEMS OPERATIONAL</div>
        </div>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {nav.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${
                location.pathname === item.to ? "active" : ""
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
