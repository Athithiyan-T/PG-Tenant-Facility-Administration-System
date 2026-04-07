import { Link, Route, Routes } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MyRoom from "./MyRoom";
import ComplaintsTenant from "./ComplaintsTenant";
import ServicesTenant from "./ServicesTenant";

function TenantHome() {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Tenant Dashboard</h2>
      <p className="muted">Room details, complaints, and facility services.</p>
      <div className="row">
        <Link className="btn" to="room">
          My Room
        </Link>
        <Link className="btn" to="complaints">
          My Complaints
        </Link>
        <Link className="btn" to="services">
          Service Requests
        </Link>
      </div>
    </div>
  );
}

export default function TenantDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <div className="nav">
        <div className="brand">Tenant</div>
        <div className="row">
          <div className="muted">{user?.email}</div>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ height: 18 }} />

      <Routes>
        <Route index element={<TenantHome />} />
        <Route path="room" element={<MyRoom />} />
        <Route path="complaints" element={<ComplaintsTenant />} />
        <Route path="services" element={<ServicesTenant />} />
      </Routes>
    </div>
  );
}

