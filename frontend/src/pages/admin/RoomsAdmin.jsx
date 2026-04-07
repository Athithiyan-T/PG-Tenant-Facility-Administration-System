import { useEffect, useState } from "react";
import { apiFetch } from "../../api/client";

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({ roomNumber: "", floor: 0, capacity: 1, notes: "" });
  const [editingId, setEditingId] = useState(null);

  async function load() {
    setError("");
    try {
      const data = await apiFetch("/rooms");
      setRooms(data.rooms || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(room) {
    setEditingId(room._id);
    setForm({
      roomNumber: room.roomNumber || "",
      floor: room.floor ?? 0,
      capacity: room.capacity ?? 1,
      notes: room.notes || "",
    });
  }

  function reset() {
    setEditingId(null);
    setForm({ roomNumber: "", floor: 0, capacity: 1, notes: "" });
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (editingId) {
        await apiFetch(`/rooms/${editingId}`, { method: "PUT", body: JSON.stringify(form) });
      } else {
        await apiFetch("/rooms", { method: "POST", body: JSON.stringify(form) });
      }
      reset();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this room?")) return;
    setBusy(true);
    setError("");
    try {
      await apiFetch(`/rooms/${id}`, { method: "DELETE" });
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
        <h3 style={{ marginTop: 0 }}>{editingId ? "Update Room" : "Add Room"}</h3>
        <form onSubmit={submit}>
          <div style={{ display: "grid", gap: 10 }}>
            <input
              className="input"
              placeholder="Room Number (e.g. A-101)"
              value={form.roomNumber}
              onChange={(e) => setForm((p) => ({ ...p, roomNumber: e.target.value }))}
            />
            <div className="row">
              <input
                className="input"
                type="number"
                placeholder="Floor"
                value={form.floor}
                onChange={(e) => setForm((p) => ({ ...p, floor: Number(e.target.value) }))}
                style={{ flex: 1 }}
              />
              <input
                className="input"
                type="number"
                placeholder="Capacity"
                value={form.capacity}
                onChange={(e) => setForm((p) => ({ ...p, capacity: Number(e.target.value) }))}
                style={{ flex: 1 }}
              />
            </div>
            <input
              className="input"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            />
            {error ? <div className="error">{error}</div> : null}
            <div className="row">
              <button className="btn btnPrimary" disabled={busy} type="submit">
                {busy ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              {editingId ? (
                <button className="btn" type="button" onClick={reset} disabled={busy}>
                  Cancel
                </button>
              ) : null}
              <button className="btn" type="button" onClick={load} disabled={busy}>
                Refresh
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Rooms</h3>
        {rooms.length === 0 ? (
          <div className="muted">No rooms yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {rooms.map((r) => (
              <div key={r._id} className="card" style={{ padding: 12 }}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{r.roomNumber}</div>
                    <div className="muted">
                      Floor: {r.floor} • Capacity: {r.capacity}
                    </div>
                  </div>
                  <div className="row">
                    <button className="btn" onClick={() => startEdit(r)} disabled={busy}>
                      Edit
                    </button>
                    <button className="btn" onClick={() => remove(r._id)} disabled={busy}>
                      Delete
                    </button>
                  </div>
                </div>
                {r.notes ? <div className="muted" style={{ marginTop: 8 }}>{r.notes}</div> : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

