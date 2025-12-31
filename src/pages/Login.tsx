import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { useData } from "../context/DataContext";
import { supabase } from "../lib/supabase";

export default function Login() {
  const { members } = useData();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting Login:", { email: username.trim(), password });
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username.trim(),
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        // Get Profile to check role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          // If no profile, fallback/create or just login as member
          console.error("Profile missing:", profileError);
        }

        const userRole = profile?.role || "member";
        const userName = profile?.name || data.user.email;

        localStorage.setItem(
          "userSession",
          JSON.stringify({
            role: userRole,
            name: userName,
            id: data.user.id,
            email: data.user.email,
            joinDate:
              profile?.join_date || new Date().toISOString().split("T")[0],
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
      console.error("Login Error:", err);
      let msg = err.message || "Login gagal.";
      if (msg.includes("Invalid login credentials")) {
        msg = "Email atau Password salah. (Atau email belum dikonfirmasi)";
      }
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden border border-stone-100">
        <div className="bg-secondary p-8 text-center">
          <h2 className="text-2xl font-bold font-serif text-white mb-2">
            Perpustakaan Desa
          </h2>
          <p className="text-secondary-light">Masuk ke Akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Masukkan email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Masukkan password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Masuk
          </button>

          <div className="text-center mt-6">
            <p className="text-text-secondary text-sm">
              Belum punya akun?{" "}
              <Link
                to="/daftar"
                className="text-primary font-bold hover:underline"
              >
                Daftar disini
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
