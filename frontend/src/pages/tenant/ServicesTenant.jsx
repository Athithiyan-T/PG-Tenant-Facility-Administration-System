import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import StatusBadge from "../../components/StatusBadge";

const SERVICES = ["cleaning", "food", "cctv", "washing", "electrical", "wifi"];

export default function ServicesTenant() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ serviceType: "cleaning", details: "" });

  async function load() {
    setError("");
    try {
      const data = await apiFetch("/services");
      setItems(data.serviceRequests || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await apiFetch("/services", { method: "POST", body: JSON.stringify(form) });
      setForm({ serviceType: "cleaning", details: "" });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid2">
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Request a Service</h3>
        <form onSubmit={submit}>
          <div style={{ display: "grid", gap: 10 }}>
            <select
              className="input"
              value={form.serviceType}
              onChange={(e) => setForm((p) => ({ ...p, serviceType: e.target.value }))}
            >
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <textarea
              className="input"
              rows={4}
              placeholder="Details (optional)"
              value={form.details}
              onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
            />
            {error ? <div className="error">{error}</div> : null}
            <div className="row">
              <button className="btn btnPrimary" disabled={busy} type="submit">
                {busy ? "Submitting..." : "Submit"}
              </button>
              <button className="btn" type="button" onClick={load} disabled={busy}>
                Refresh
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>My Service Requests</h3>
        {items.length === 0 ? (
          <div className="muted">No requests yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((s) => (
              <div key={s._id} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{s.serviceType}</div>
                    {s.details ? <div className="muted">{s.details}</div> : <div className="muted">—</div>}
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

