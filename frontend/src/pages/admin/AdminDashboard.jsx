import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RoomsAdmin from "./RoomsAdmin";
import ComplaintsAdmin from "./ComplaintsAdmin";
import ServicesAdmin from "./ServicesAdmin";

function AdminHome() {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Admin Dashboard</h2>
      <p className="muted">Rooms, complaints, and service requests.</p>
      <div className="row">
        <Link className="btn" to="rooms">
          Room Management
        </Link>
        <Link className="btn" to="complaints">
          Complaints
        </Link>
        <Link className="btn" to="services">
          Service Requests
        </Link>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="container">
      <div className="nav">
        <div className="brand">Admin</div>
        <div className="row">
          <div className="muted">{user?.email}</div>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ height: 18 }} />

      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="rooms" element={<RoomsAdmin />} />
        <Route path="complaints" element={<ComplaintsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
      </Routes>
    </div>
  );
}

