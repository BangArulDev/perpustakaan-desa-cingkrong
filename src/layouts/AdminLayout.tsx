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
  X,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Untuk Desktop
  const [isMobileOpen, setMobileOpen] = useState(false); // Untuk Mobile
  const location = useLocation();
  const navigate = useNavigate();

  // Menutup menu mobile otomatis saat navigasi berpindah
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

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
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
      
      {/* 1. MOBILE OVERLAY (Muncul saat sidebar mobile terbuka) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 2. SIDEBAR CONTAINER */}
      <aside
        className={`
          ${isSidebarOpen ? "lg:w-72" : "lg:w-20"} 
          fixed lg:relative z-50 h-full bg-[#0F172A] text-white transition-all duration-300 ease-in-out flex flex-col
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header Sidebar */}
        <div className="p-6 flex items-center h-24 border-b border-white/5 overflow-hidden">
          <div className={`flex items-center gap-4 ${!isSidebarOpen && "lg:justify-center lg:w-full"}`}>
            <div className="bg-primary p-2.5 rounded-2xl shrink-0 shadow-lg shadow-primary/20">
              <Library size={22} className="text-white" />
            </div>
            {(isSidebarOpen || isMobileOpen) && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="font-bold tracking-tight text-lg leading-tight">Cingkrong</span>
                <span className="text-primary-light text-[9px] font-black uppercase tracking-[0.3em]">Management</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                  isActive
                    ? "bg-primary text-white shadow-xl shadow-primary/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-white" : "group-hover:text-primary-light transition-colors"} />
                {(isSidebarOpen || isMobileOpen) && (
                  <motion.span 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-bold text-[11px] uppercase tracking-[0.15em] whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
                
                {/* Desktop Tooltip (hanya muncul saat sidebar mini) */}
                {!isSidebarOpen && (
                  <div className="absolute left-16 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all invisible lg:visible whitespace-nowrap z-50 shadow-xl border border-white/10">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar (Logout) */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-4 text-slate-400 hover:text-accent hover:bg-accent/5 rounded-2xl transition-all group"
          >
            <LogOut size={20} />
            {(isSidebarOpen || isMobileOpen) && (
              <span className="font-bold text-[11px] uppercase tracking-widest">Logout System</span>
            )}
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white h-24 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-20 shadow-sm shadow-slate-200/20">
          <div className="flex items-center gap-6">
            {/* Desktop Toggle Button */}
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all border border-slate-100 group"
            >
              <motion.div animate={{ rotate: isSidebarOpen ? 0 : 180 }}>
                <ChevronLeft size={20} />
              </motion.div>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 border border-slate-100"
            >
              <Menu size={20} />
            </button>

            <div className="flex flex-col">
              <h2 className="font-black text-slate-900 text-[11px] uppercase tracking-[0.3em]">
                {menuItems.find(i => i.path === location.pathname)?.label || "Sistem"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Live System Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">Admin Central</span>
              <span className="text-[9px] text-primary font-black uppercase tracking-widest mt-1.5 px-2 py-0.5 bg-primary/5 rounded-lg">Root Privileges</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary font-black text-xs shadow-sm ring-8 ring-slate-50/50">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#F8FAFC]">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}