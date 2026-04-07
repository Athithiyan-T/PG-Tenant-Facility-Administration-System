import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";
import StatusBadge from "../../components/StatusBadge";

const STATUSES = ["Pending", "In Progress", "Resolved"];

export default function ServicesAdmin() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

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

  async function setStatus(id, status) {
    setBusyId(id);
    setError("");
    try {
      await apiFetch(`/services/${id}/status`, {
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
        <h3 style={{ margin: 0 }}>Service Requests</h3>
        <button className="btn" onClick={load}>
          Refresh
        </button>
      </div>

      <div style={{ height: 12 }} />
      {error ? <div className="error">{error}</div> : null}

      {items.length === 0 ? (
        <div className="muted">No service requests.</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((s) => (
            <div key={s._id} className="card" style={{ padding: 12 }}>
              <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.serviceType}</div>
                  <div className="muted">
                    Tenant: {s.tenant?.email || "—"} • Room: {s.room?.roomNumber || "—"}
                  </div>
                </div>
                <StatusBadge status={s.status} />
              </div>
              {s.details ? (
                <>
                  <div style={{ height: 8 }} />
                  <div className="muted">{s.details}</div>
                </>
              ) : null}
              <div style={{ height: 10 }} />
              <div className="row">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    className="btn"
                    disabled={busyId === s._id}
                    onClick={() => setStatus(s._id, st)}
                  >
                    Mark {st}
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

