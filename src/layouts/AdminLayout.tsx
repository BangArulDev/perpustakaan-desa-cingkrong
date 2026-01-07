import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  Library,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userSession");
    navigate("/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/books", icon: BookOpen, label: "Kelola Buku" },
    { path: "/admin/members", icon: Users, label: "Data Anggota" },
    { path: "/admin/settings", icon: Settings, label: "Pengaturan" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#132440] text-white transition-all duration-300 flex flex-col fixed md:relative z-30 h-full shadow-xl`}
      >
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between h-20 border-b border-white/5">
          <div className={`flex items-center gap-3 overflow-hidden ${!isSidebarOpen && "justify-center w-full"}`}>
            <div className="bg-primary p-2 rounded-lg shrink-0">
              <Library size={20} className="text-white" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold tracking-tight text-lg whitespace-nowrap">
                Cingkrong<span className="text-primary-light text-xs ml-1 font-normal uppercase tracking-widest">Lib</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-white" : "group-hover:text-primary-light"} />
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 text-slate-400 hover:text-accent-light hover:bg-accent/10 rounded-xl transition-all group"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-semibold text-sm">Keluar Sesi</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="font-bold text-slate-800 text-lg">
              {menuItems.find(i => i.path === location.pathname)?.label || "Sistem Informasi"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-800 leading-none">Administrator</span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Super User</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-primary font-bold shadow-sm">
              AD
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}