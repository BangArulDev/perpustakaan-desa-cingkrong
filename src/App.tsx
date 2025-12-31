import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageMembers from "./pages/admin/ManageMembers";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/daftar" element={<Register />} />
        </Route>

        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<ManageBooks />} />
            <Route path="members" element={<ManageMembers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
