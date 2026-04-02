import { useTheme } from "../providers/theme-provider";
import { useAuth } from "../providers/auth-provider";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

const SignalIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
);

const DotsIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="12" cy="12" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="4" cy="12" r="2" />
  </svg>
);

export const Topbar = () => {
  const { theme, toggle } = useTheme();
  const { email, logout } = useAuth();
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const avatarLabel = email?.[0]?.toUpperCase() ?? "A";

  return (
    <header className="topbar">
      <div className="topbar-logo">
        <img src="/logo.png" alt="AdBox logo" className="topbar-logo-mark" />
        <span>AdBox</span>
      </div>

      <div className="topbar-sep" />

      <span className="topbar-title">Parallel Monitoring View</span>

      <div className="topbar-right">
        {/* SEARCH */}
        <label className="search" aria-label="Search systems">
          <SearchIcon />
          <input
            type="text"
            className="search-input"
            placeholder="Search systems..."
          />
        </label>

        {/* ACTIONS */}
        <button
          type="button"
          className="topbar-icon theme-toggle"
          onClick={toggle}
          aria-label={`Switch to ${nextTheme} mode`}
          title={`Switch to ${nextTheme} mode`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
          <span>{isDark ? "Light" : "Dark"}</span>
        </button>

        <div className="topbar-icon">
          <SignalIcon />
        </div>

        <div className="topbar-icon">
          <DotsIcon />
        </div>

        {/* AVATAR */}
        <button
          type="button"
          className="avatar"
          onClick={logout}
          title="Log out"
          aria-label="Log out"
        >
          {avatarLabel}
        </button>
      </div>
    </header>
  );
};
