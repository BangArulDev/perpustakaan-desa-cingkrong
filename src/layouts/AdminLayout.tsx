import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout - clear "auth" token
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/books", icon: BookOpen, label: "Kelola Buku" },
    { path: "/admin/members", icon: Users, label: "Anggota" },
    { path: "/admin/settings", icon: Settings, label: "Pengaturan" },
  ];

  return (
    <div className="flex h-screen bg-stone-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-secondary text-white transition-all duration-300 flex flex-col fixed md:relative z-30 h-full`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10 h-16">
          <span
            className={`font-serif font-bold text-xl truncate ${
              !isSidebarOpen && "hidden"
            }`}
          >
            Admin Panel
          </span>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/10 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-accent text-secondary font-bold shadow-md"
                  : "hover:bg-white/10 text-stone-300 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2 text-red-300 hover:bg-red-500/20 hover:text-red-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white h-16 border-b border-stone-200 flex items-center justify-between px-6 shadow-sm">
          <h2 className="font-bold text-primary-dark text-lg capitalize">
            {location.pathname.split("/").pop()}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-sm font-medium text-text-primary">
                Admin
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
