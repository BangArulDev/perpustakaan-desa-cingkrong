import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, LogOut, User, LayoutDashboard, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userSession = JSON.parse(localStorage.getItem("userSession") || "null");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Katalog Buku", path: "/katalog" },
    ...(!userSession ? [{ name: "Daftar Anggota", path: "/daftar" }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-slate-100 py-3" 
          : "bg-white border-b border-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section - Ultra Clean */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-xl group-hover:scale-105 transition-transform">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Cingkrong<span className="text-primary font-black uppercase text-[10px] ml-1 tracking-widest">Lib</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                    isActive(link.path) ? "text-primary" : "text-slate-400 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center pl-8 border-l border-slate-100 gap-6">
              {userSession ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Anggota</span>
                    <span className="text-sm font-bold text-slate-700">{userSession.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {userSession.role === "admin" && (
                      <Link
                        to="/admin"
                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                        title="Panel Admin"
                      >
                        <LayoutDashboard size={18} />
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="p-2 text-slate-400 hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                      title="Keluar Sesi"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900 p-2 hover:bg-slate-50 rounded-xl transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Minimalist Slide */}
      <div 
        className={`md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-black uppercase tracking-widest flex justify-between items-center ${
                isActive(link.path) ? 'text-primary' : 'text-slate-500'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
              <ChevronRight size={14} className={isActive(link.path) ? "opacity-100" : "opacity-0"} />
            </Link>
          ))}
          <div className="h-[1px] bg-slate-50 w-full" />
          {userSession ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                  {userSession.name.charAt(0)}
                </div>
                <span className="font-bold text-slate-800">{userSession.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-accent font-black text-[10px] uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-full bg-primary py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-white text-center shadow-lg shadow-primary/20"
              onClick={() => setIsOpen(false)}
            >
              Masuk ke Akun
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}