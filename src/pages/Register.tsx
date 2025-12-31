import { useState, useEffect } from "react";
import { User, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

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
    if (formData.password !== formData.confirmPassword) {
      setError("Password tidak sama");
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
      // Error already handled in context alert
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-primary-dark mb-4">
            Daftar Anggota
          </h1>
          <p className="text-text-secondary">
            Bergabunglah dengan perpustakaan desa kami.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-secondary">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  required
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  required
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  required
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 h-5 w-5" />
                <input
                  required
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Ulangi Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition"
            >
              Daftar Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
