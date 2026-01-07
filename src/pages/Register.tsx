import { useState, useEffect } from "react";
import { User, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { motion } from "framer-motion";

export default function Register() {
  const { registerMember } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const userSession = localStorage.getItem("userSession");
    if (userSession) navigate("/profile");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }
    try {
      await registerMember({
        name: formData.name,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  // Gaya Input Bottom-Border (Input-B) Konsisten
  const inputClass = "w-full pl-10 py-3 bg-transparent border-b border-slate-200 focus:border-primary outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300";
  const labelClass = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1";

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Blur - Light Version */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-white shadow-sm rounded-2xl mb-6 border border-slate-100">
            <ShieldCheck className="text-primary h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Gabung <span className="text-primary">Anggota</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            Mulai petualangan literasi digital Anda hari ini.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/5 border border-accent/10 text-accent p-4 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className={labelClass}>Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    type="text"
                    className={inputClass}
                    placeholder="Budi Santoso"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Email Aktif</label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="password"
                  className={inputClass}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Konfirmasi Sandi</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  required
                  type="password"
                  className={inputClass}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                Registrasi Akun
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-xs font-medium">
              Sudah memiliki akun?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4">
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}