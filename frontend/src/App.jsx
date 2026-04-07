import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TenantDashboard from "./pages/tenant/TenantDashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={user.role === "admin" ? "/admin" : "/tenant"} /> : <Landing />} />
      <Route path="/login/admin" element={<Login role="admin" />} />
      <Route path="/login/tenant" element={<Login role="tenant" />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/*"
        element={
          <ProtectedRoute role="tenant">
            <TenantDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
