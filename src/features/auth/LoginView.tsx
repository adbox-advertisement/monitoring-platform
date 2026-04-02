import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "#/app/providers/auth-provider";

export function LoginView() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password.");
      return;
    }

    login(email.trim());
    navigate({ to: "/" });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-mark">
            <img src="/logo.png" alt="AdBox logo" className="login-logo" />
          </div>
          <div>
            <div className="login-eyebrow">Secure Access</div>
            <h1 className="login-title">AdBox Service Monitor</h1>
            <p className="login-subtitle">
              Sign in to access the monitoring dashboard.
            </p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Email</span>
            <input
              // type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>

          {error ? <div className="login-error">{error}</div> : null}

          <button type="submit" className="login-submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
