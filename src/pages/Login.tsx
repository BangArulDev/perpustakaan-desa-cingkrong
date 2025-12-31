import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem(
        "userSession",
        JSON.stringify({ role: "admin", name: "Administrator" })
      );
      // Keep legacy for ProtectedRoute compatibility until refactored
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else if (username === "user" && password === "user123") {
      localStorage.setItem(
        "userSession",
        JSON.stringify({ role: "member", name: "Budi Santoso" })
      );
      navigate("/");
    } else {
      setError("Username atau password salah!");
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
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Masukkan username"
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
        </form>
        <div className="px-8 pb-8 text-center text-sm text-stone-400 space-y-1">
          <p>Admin: admin / admin123</p>
          <p>User: user / user123</p>
        </div>
      </div>
    </div>
  );
}
