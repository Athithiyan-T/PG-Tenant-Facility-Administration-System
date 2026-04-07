import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import StatusBadge from "../../components/StatusBadge";

const STATUSES = ["Pending", "In Progress", "Resolved"];

export default function ComplaintsAdmin() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

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

  async function setStatus(id, status) {
    setBusyId(id);
    setError("");
    try {
      await apiFetch(`/complaints/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>Complaints</h3>
        <button className="btn" onClick={load}>
          Refresh
        </button>
      </div>

      <div style={{ height: 12 }} />
      {error ? <div className="error">{error}</div> : null}

      {items.length === 0 ? (
        <div className="muted">No complaints.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((c) => (
            <div key={c._id} className="card" style={{ padding: 12 }}>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div className="muted">
                    Category: {c.category} • Tenant: {c.tenant?.email || "—"} • Room:{" "}
                    {c.room?.roomNumber || "—"}
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <div style={{ height: 8 }} />
              <div className="muted">{c.description}</div>
              <div style={{ height: 10 }} />
              <div className="row">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    className="btn"
                    disabled={busyId === c._id}
                    onClick={() => setStatus(c._id, s)}
                  >
                    Mark {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

