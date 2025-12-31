import { useState } from "react";
import { Save, Building, Lock, Bell } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [generalInfo, setGeneralInfo] = useState({
    libraryName: "Perpustakaan Desa Cingkrong",
    address: "Jl. Raya Cingkrong No. 45, Grobogan",
    email: "perpus.cingkrong@example.com",
    phone: "0812-3456-7890",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    newMember: true,
    overdue: true,
    weeklyReport: false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-primary-dark">
          Pengaturan
        </h1>
        <p className="text-text-secondary">
          Kelola informasi perpustakaan dan keamanan akun.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 space-y-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "general"
                ? "bg-white text-primary shadow-sm border border-stone-200"
                : "text-text-secondary hover:bg-stone-100"
            }`}
          >
            <Building size={18} />
            Umum
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "security"
                ? "bg-white text-primary shadow-sm border border-stone-200"
                : "text-text-secondary hover:bg-stone-100"
            }`}
          >
            <Lock size={18} />
            Keamanan
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "notifications"
                ? "bg-white text-primary shadow-sm border border-stone-200"
                : "text-text-secondary hover:bg-stone-100"
            }`}
          >
            <Bell size={18} />
            Notifikasi
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
            {activeTab === "general" && (
              <form onSubmit={handleSave} className="space-y-6">
                <h3 className="text-lg font-bold text-primary-dark border-b border-stone-100 pb-2">
                  Informasi Perpustakaan
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Nama Perpustakaan
                    </label>
                    <input
                      type="text"
                      value={generalInfo.libraryName}
                      onChange={(e) =>
                        setGeneralInfo({
                          ...generalInfo,
                          libraryName: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows={3}
                      value={generalInfo.address}
                      onChange={(e) =>
                        setGeneralInfo({
                          ...generalInfo,
                          address: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Email Kontak
                      </label>
                      <input
                        type="email"
                        value={generalInfo.email}
                        onChange={(e) =>
                          setGeneralInfo({
                            ...generalInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        value={generalInfo.phone}
                        onChange={(e) =>
                          setGeneralInfo({
                            ...generalInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                  >
                    <Save size={18} />
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handleSave} className="space-y-6">
                <h3 className="text-lg font-bold text-primary-dark border-b border-stone-100 pb-2">
                  Ubah Password
                </h3>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Password Saat Ini
                    </label>
                    <input
                      type="password"
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Password Baru
                    </label>
                    <input
                      type="password"
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Konfirmasi Password Baru
                    </label>
                    <input
                      type="password"
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                  >
                    <Save size={18} />
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {activeTab === "notifications" && (
              <form onSubmit={handleSave} className="space-y-6">
                <h3 className="text-lg font-bold text-primary-dark border-b border-stone-100 pb-2">
                  Preferensi Notifikasi
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg border border-stone-100">
                    <div>
                      <h4 className="font-bold text-text-primary">
                        Notifikasi Email
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Aktifkan notifikasi via email utama.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notifications.email}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            email: e.target.checked,
                          })
                        }
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="pl-4 space-y-4 border-l-2 border-stone-100">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">
                        Anggota Baru Mendaftar
                      </span>
                      <input
                        type="checkbox"
                        checked={notifications.newMember}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            newMember: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                        disabled={!notifications.email}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">
                        Buku Jatuh Tempo
                      </span>
                      <input
                        type="checkbox"
                        checked={notifications.overdue}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            overdue: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                        disabled={!notifications.email}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">
                        Laporan Mingguan
                      </span>
                      <input
                        type="checkbox"
                        checked={notifications.weeklyReport}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            weeklyReport: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                        disabled={!notifications.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                  >
                    <Save size={18} />
                    Simpan Preferensi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
