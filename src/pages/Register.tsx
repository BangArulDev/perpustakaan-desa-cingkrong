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
    if (userSession) {
      navigate("/profile");
    }
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
      // Error handling dari context
    }
  };

  const inputClass = "w-full pl-12 pr-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-white placeholder:text-stone-500";

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 py-12">
      {/* Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />


      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-primary/20 rounded-2xl mb-4">
            <ShieldCheck className="text-primary-light h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold font-serif text-white mb-2">
            Gabung <span className="text-primary-light">Anggota</span>
          </h1>
          <p className="text-stone-400">
            Dapatkan akses penuh ke ribuan koleksi buku digital dan fisik.
          </p>
        </div>

        <div className="bg-surface border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/10 border border-accent/20 text-accent-light p-4 rounded-xl text-sm flex items-center gap-3"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
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

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
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

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
                Password Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
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

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
                Ulangi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
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

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-xl shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                Buat Akun Sekarang
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-stone-400">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-primary-light font-bold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}