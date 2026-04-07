import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container">
      <div className="nav">
        <div className="brand">PG Tenant &amp; Facility Administration System</div>
        <div className="muted">Role-based dashboard</div>
      </div>

      <div className="section-gap" />

      <div className="grid2">
        <div className="card">
          <h2 className="page-heading">Admin Login</h2>
          <p className="muted">Manage rooms, services, and tenant complaints.</p>
          <div className="section-gap" />
          <Link className="btn btnPrimary" to="/login/admin">
            Continue as Admin
          </Link>
        </div>
        <div className="card">
          <h2 className="page-heading">Tenant Login</h2>
          <p className="muted">View room details, request services, and raise complaints.</p>
          <div className="section-gap" />
          <Link className="btn btnPrimary" to="/login/tenant">
            Continue as Tenant
          </Link>
        </div>
      </div>
    </div>
  );
}

