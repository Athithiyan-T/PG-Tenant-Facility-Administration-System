import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";

export default function MyRoom() {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const data = await apiFetch("/rooms/my");
      setRoom(data.room || null);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>My Room</h3>
        <button className="btn" onClick={load}>
          Refresh
        </button>
      </div>
      <div style={{ height: 12 }} />
      {error ? <div className="error">{error}</div> : null}

      {!room ? (
        <div className="muted">No room assigned yet.</div>
      ) : (
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{room.roomNumber}</div>
          <div className="muted">
            Floor: {room.floor} • Capacity: {room.capacity}
          </div>
          {room.notes ? (
            <>
              <div style={{ height: 8 }} />
              <div className="muted">{room.notes}</div>
            </>
          ) : null}

          <div style={{ height: 12 }} />
          <div style={{ fontWeight: 700 }}>Current tenants</div>
          <div className="muted">
            {(room.currentTenants || []).map((t) => t.email).join(", ") || "—"}
          </div>
        </div>
      )}
    </div>
  );
}

