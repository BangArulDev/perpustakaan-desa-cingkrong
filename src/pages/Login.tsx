import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, Info, AlertCircle, KeyRound } from "lucide-react";
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

        if (profileError) console.error("Profile missing:", profileError);

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

  const inputClass = "w-full pl-12 pr-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-white placeholder:text-stone-500";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Logo/Header Area */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <KeyRound className="text-white h-6 w-6" />
            </div>
            <span className="font-serif font-bold text-2xl text-white">Desa<span className="text-primary-light">Cingkrong</span></span>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang</h2>
          <p className="text-stone-400">Masuk untuk mengelola pinjaman buku Anda</p>
        </div>

        <div className="bg-surface border border-white/10 p-8 rounded-[2rem] shadow-2xl relative">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ x: -10 }} 
                animate={{ x: 0 }}
                className="bg-accent/10 border border-accent/20 text-accent-light p-4 rounded-xl text-sm flex items-start gap-3"
              >
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-200 ml-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
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

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-200 ml-1">
                  Kata Sandi
                </label>
                <Link to="/reset-password" className="text-[10px] font-bold text-primary-light hover:underline uppercase tracking-wider">
                  Lupa Sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 bg-primary hover:bg-primary-dark text-white font-black rounded-xl shadow-xl shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Memproses..." : "Masuk ke Akun"}
              {!isLoading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <p className="text-stone-400 text-sm">
              Belum memiliki akun?{" "}
              <Link
                to="/daftar"
                className="text-primary-light font-bold hover:underline"
              >
                Daftar Gratis
              </Link>
            </p>
            
            <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-background/50 px-3 py-1 rounded-full border border-white/5">
              <Info size={12} />
              <span>Gunakan akun terdaftar di Desa Cingkrong</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}