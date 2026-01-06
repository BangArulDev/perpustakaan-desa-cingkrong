import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, LogOut, User, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userSession = JSON.parse(localStorage.getItem("userSession") || "null");

  // Effect untuk shadow saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  const activeLink = (path: string) => 
    location.pathname === path ? "text-primary-light" : "text-white/90 hover:text-primary-light";

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-secondary shadow-xl py-2" : "bg-background border-b border-white/10 py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary-dark transition-colors">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-white">
              Desa<span className="text-primary-light ml-1">Cingkrong</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${activeLink(link.path)} font-medium transition duration-200 text-sm tracking-wide uppercase`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center pl-8 border-l border-white/10 space-x-4">
              {userSession ? (
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-white/60 font-medium">Selamat Datang,</span>
                    <span className="text-sm font-bold text-primary-light capitalize">{userSession.name}</span>
                  </div>
                  
                  {userSession.role === "admin" && (
                    <Link
                      to="/admin"
                      className="p-2 bg-surface hover:bg-primary transition rounded-full text-white"
                      title="Panel Admin"
                    >
                      <LayoutDashboard size={18} />
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-lg active:scale-95"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-full font-bold transition duration-300 shadow-md hover:shadow-primary/20 transform hover:-translate-y-0.5"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute w-full bg-secondary border-t border-white/5 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium py-2 ${location.pathname === link.path ? 'text-primary-light' : 'text-white'}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-white/10" />
          {userSession ? (
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-3 text-primary-light">
                <User size={20} />
                <span className="font-bold">{userSession.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-accent py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Keluar
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-full bg-primary py-3 rounded-xl font-bold text-white text-center"
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