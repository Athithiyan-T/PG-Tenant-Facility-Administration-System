import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login({ role }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState(role === "admin" ? "admin@pg.com" : "tenant@pg.com");
  const [password, setPassword] = useState(role === "admin" ? "Admin@123" : "Tenant@123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const title = useMemo(() => (role === "admin" ? "Admin Login" : "Tenant Login"), [role]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(email, password);
      if (user.role === "admin") navigate("/admin", { replace: true });
      else navigate("/tenant", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="nav">
        <div className="brand">{title}</div>
        <button className="btn" onClick={() => navigate("/", { replace: true })}>
          Back
        </button>
      </div>

      <div className="section-gap" />

      <div className="card cardForm">
        <form onSubmit={onSubmit}>
          <div className="form-field-grid">
            <label>
              <div className="label-text">Email</div>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              <div className="label-text">Password</div>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error ? <div className="error">{error}</div> : null}
            <div className="form-actions">
              <button className="btn btnPrimary" disabled={busy} type="submit">
                {busy ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

