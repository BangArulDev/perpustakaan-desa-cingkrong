import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, Info, AlertCircle, KeyRound, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function Login() {
  const { members } = useData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username.trim(),
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        const userRole = profile?.role || "member";
        const userName = profile?.name || data.user.email;

        localStorage.setItem(
          "userSession",
          JSON.stringify({
            role: userRole,
            name: userName,
            id: data.user.id,
            email: data.user.email,
            joinDate: profile?.join_date || new Date().toISOString().split("T")[0],
          })
        );

        if (userRole === "admin") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin/dashboard");
        } else {
          if (profile?.status === "blocked") {
            throw new Error("Akun Anda diblokir. Hubungi admin.");
          }
          navigate("/profile");
        }
      }
    } catch (err: any) {
      let msg = err.message || "Login gagal.";
      if (msg.includes("Invalid login credentials")) {
        msg = "Email atau Password salah.";
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full pl-10 py-3 bg-transparent border-b border-slate-200 focus:border-primary outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300";
  const labelClass = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Light Blurs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Branding Area */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <KeyRound className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900">
              Cingkrong<span className="text-primary font-black uppercase text-[10px] ml-1 tracking-widest">Lib</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Selamat Datang</h2>
          <p className="text-slate-500 font-medium italic text-sm">Masuk untuk mengelola literasi Anda</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white relative">
          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/5 border border-accent/10 text-accent p-4 rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center gap-3"
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-1">
              <label className={labelClass}>Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className={labelClass}>Kata Sandi</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Link to="/reset-password" className="text-[10px] font-bold text-primary hover:text-primary-dark uppercase tracking-widest transition-colors">
                  Lupa password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 bg-primary hover:bg-primary-dark text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Otentikasi..." : "Masuk ke Akun"}
              {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col items-center gap-6">
            <p className="text-slate-400 text-xs font-medium">
              Belum memiliki akun?{" "}
              <Link to="/daftar" className="text-primary font-bold hover:underline underline-offset-4">
                Daftar Sekarang
              </Link>
            </p>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
              <Sparkles size={12} className="text-primary" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Akses Desa Cingkrong</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}