import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import StatusBadge from "../../components/StatusBadge";

const CATEGORIES = ["cleaning", "food", "cctv", "washing", "electrical", "wifi", "other"];

export default function ComplaintsTenant() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ category: "wifi", title: "", description: "" });

  async function load() {
    setError("");
    try {
      const data = await apiFetch("/complaints");
      setItems(data.complaints || []);
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
      await apiFetch("/complaints", { method: "POST", body: JSON.stringify(form) });
      setForm({ category: "wifi", title: "", description: "" });
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
        <h3 style={{ marginTop: 0 }}>Raise a Complaint</h3>
        <form onSubmit={submit}>
          <div style={{ display: "grid", gap: 10 }}>
            <select
              className="input"
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
            <textarea
              className="input"
              rows={4}
              placeholder="Describe the issue"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
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
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>My Complaints</h3>
        </div>
        <div style={{ height: 12 }} />
        {items.length === 0 ? (
          <div className="muted">No complaints yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((c) => (
              <div key={c._id} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{c.title}</div>
                    <div className="muted">Category: {c.category}</div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <div style={{ height: 8 }} />
                <div className="muted">{c.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

