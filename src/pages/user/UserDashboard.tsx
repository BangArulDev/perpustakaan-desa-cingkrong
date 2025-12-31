import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Library,
  BookOpen,
  Clock,
  History,
  Award,
  User,
  CreditCard,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useData } from "../../context/DataContext";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { loans, books } = useData();
  const [activeTab, setActiveTab] = useState<"card" | "loans" | "settings">(
    "card"
  );

  // Settings State
  const session = localStorage.getItem("userSession");
  const user = session ? JSON.parse(session) : null;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!user || user.role !== "member") {
    return (
      <div className="text-center py-20">
        <p>Anda belum login.</p>
        <button
          onClick={() => navigate("/login")}
          className="text-primary underline"
        >
          Login
        </button>
      </div>
    );
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem("userSession", JSON.stringify(updatedUser));

      // In a real app, you'd verify password change too
      alert("Profil berhasil diperbarui!");
      setIsSaving(false);
      // Force re-render/update
      window.location.reload();
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // Filter loans for this user
  const userLoans = loans.filter((loan) => loan.memberId === user.id);
  const activeLoans = userLoans.filter(
    (loan) => loan.status === "borrowed" || loan.status === "overdue"
  );
  const historyLoans = userLoans.filter((loan) => loan.status === "returned");
  const overdueLoans = userLoans.filter((loan) => loan.status === "overdue");

  const getBookDetails = (bookId: number) => books.find((b) => b.id === bookId);

  // Calculate Reader Level
  let readerLevel = "Pembaca Pemula";
  let levelColor = "bg-emerald-500"; // Default nice green
  const completedLoansCount = historyLoans.length;
  const totalPoints = completedLoansCount * 10; // 10 points per book

  if (completedLoansCount > 10) {
    readerLevel = "Kutu Buku";
    levelColor = "bg-amber-500"; // Gold
  } else if (completedLoansCount >= 3) {
    readerLevel = "Pembaca Aktif";
    levelColor = "bg-emerald-600"; // Darker Green
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary-dark font-serif">
            Dashboard Anggota
          </h1>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-stone-600 hover:text-primary transition font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar & Info */}
            <div className="flex flex-col items-center text-center md:w-1/3 border-b md:border-b-0 md:border-r border-stone-100 pb-6 md:pb-0 md:pr-8">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-300">
                <User className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user.name}
              </h2>
              <p className="text-stone-500 text-sm mb-1">
                Anggota Perpustakaan
              </p>
              <p className="text-stone-400 text-xs">
                Bergabung sejak {user.joinDate}
              </p>
            </div>

            {/* Level Banner & Stats */}
            <div className="flex-1 w-full">
              {/* Level Banner */}
              <div
                className={`${levelColor} rounded-xl p-6 text-white flex justify-between items-center mb-6 shadow-lg relative overflow-hidden`}
              >
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

                <div className="relative z-10">
                  <p className="text-white/80 text-sm font-medium mb-1">
                    Level Keanggotaan
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {readerLevel}
                  </h3>
                </div>
                <div className="relative z-10 text-right">
                  <h4 className="text-3xl font-bold">{totalPoints}</h4>
                  <p className="text-white/80 text-xs font-medium">
                    Poin Literasi
                  </p>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100 hover:border-primary/20 transition cursor-default">
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
                    Buku Dipinjam
                  </p>
                  <p className="text-2xl font-bold text-primary-dark">
                    {activeLoans.length}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100 hover:border-primary/20 transition cursor-default">
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
                    Buku Selesai
                  </p>
                  <p className="text-2xl font-bold text-accent-dark">
                    {completedLoansCount}
                  </p>
                </div>
                <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100 hover:border-primary/20 transition cursor-default">
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">
                    Terlambat
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      overdueLoans.length > 0
                        ? "text-red-500"
                        : "text-stone-400"
                    }`}
                  >
                    {overdueLoans.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-4 lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-4 font-bold text-gray-800 border-b border-stone-100">
                Menu Anggota
              </div>
              <div className="flex flex-col p-2 space-y-1">
                <button
                  onClick={() => setActiveTab("card")}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${
                    activeTab === "card"
                      ? "bg-primary/5 text-primary"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Kartu Anggota
                </button>
                <button
                  onClick={() => setActiveTab("loans")}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${
                    activeTab === "loans"
                      ? "bg-primary/5 text-primary"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <History className="h-5 w-5 mr-3" />
                  Riwayat Peminjaman
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${
                    activeTab === "settings"
                      ? "bg-primary/5 text-primary"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Pengaturan Profil
                </button>
                <button
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 transition opacity-50 cursor-not-allowed"
                  title="Coming Soon"
                >
                  <HelpCircle className="h-5 w-5 mr-3" />
                  Bantuan
                </button>
              </div>
              <div className="p-2 border-t border-stone-100 mt-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Keluar
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-8 lg:col-span-9">
            {activeTab === "card" && (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center animate-fade-in relative">
                <h2 className="text-xl font-bold text-gray-800 mb-6 self-start">
                  Kartu Anggota Digital
                </h2>

                <div
                  id="member-card"
                  className="w-full max-w-md bg-gradient-to-br from-primary to-secondary rounded-xl overflow-hidden shadow-2xl relative text-white p-6 aspect-[1.58/1] transform transition hover:scale-[1.02] duration-300"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                          <Library className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg leading-tight">
                            Perpustakaan Desa
                          </h3>
                          <p className="text-xs text-white/80">
                            Cingkrong, Grobogan
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm border border-white/10">
                        MEMBER CARD
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                          Nama Anggota
                        </p>
                        <h2 className="text-2xl font-bold font-serif tracking-wide truncate">
                          {user.name}
                        </h2>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                            ID Anggota
                          </p>
                          <p className="font-mono text-lg">{user.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-white/60 uppercase tracking-wider mb-1 text-right">
                            Bergabung
                          </p>
                          <p className="font-medium text-right">
                            {user.joinDate || "2024"}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="text-xs text-white/80">
                          Level Membaca
                        </span>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-accent" />
                          <span className="font-bold text-accent tracking-wide">
                            {readerLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4 w-full max-w-md print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition"
                  >
                    <Printer size={18} />
                    Cetak Kartu
                  </button>
                </div>
              </div>
            )}

            {activeTab === "loans" && (
              <div className="space-y-6 animate-fade-in">
                {/* Active Loans Panel */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                  <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Sedang Dipinjam
                    </h2>
                    <span className="ml-auto bg-orange-100 text-orange-700 py-1 px-3 rounded-full text-xs font-bold">
                      {activeLoans.length} Buku
                    </span>
                  </div>

                  {activeLoans.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {activeLoans.map((loan) => {
                        const book = getBookDetails(loan.bookId);
                        return (
                          <div
                            key={loan.id}
                            className="flex p-4 rounded-xl border border-stone-100 hover:shadow-md transition bg-stone-50/50"
                          >
                            <div className="w-16 h-24 bg-stone-200 rounded-md overflow-hidden flex-shrink-0 shadow-sm">
                              {book?.cover && (
                                <img
                                  src={book.cover}
                                  alt={book.title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="ml-4 flex-grow flex flex-col justify-center">
                              <h3 className="font-bold text-gray-800 text-lg">
                                {book?.title || "Unknown Book"}
                              </h3>
                              <p className="text-sm text-gray-500 mb-3">
                                {book?.author}
                              </p>
                              <div className="flex gap-4 text-xs">
                                <span className="flex items-center text-stone-600 bg-white px-2 py-1 rounded border border-stone-200">
                                  <Clock className="h-3 w-3 mr-1.5" />
                                  Pinjam: {loan.loanDate}
                                </span>
                                <span
                                  className={`flex items-center font-bold px-2 py-1 rounded border ${
                                    loan.status === "overdue"
                                      ? "bg-red-50 text-red-600 border-red-200"
                                      : "bg-green-50 text-green-600 border-green-200"
                                  }`}
                                >
                                  <Clock className="h-3 w-3 mr-1.5" />
                                  Tempo: {loan.dueDate}
                                  {loan.status === "overdue" && " (Terlambat)"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-stone-50 rounded-lg border border-dashed border-stone-200">
                      <BookOpen className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                      <p className="text-stone-500 font-medium">
                        Tidak ada buku yang sedang dipinjam.
                      </p>
                      <button
                        onClick={() => navigate("/katalog")}
                        className="mt-4 text-primary font-bold text-sm hover:underline"
                      >
                        Cari Buku di Katalog
                      </button>
                    </div>
                  )}
                </div>

                {/* History Panel */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                  <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <History className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Riwayat Pengembalian
                    </h2>
                    <span className="ml-auto bg-stone-100 text-stone-600 py-1 px-3 rounded-full text-xs font-bold">
                      {historyLoans.length} Arsip
                    </span>
                  </div>

                  {historyLoans.length > 0 ? (
                    <div className="divide-y divide-stone-100">
                      {historyLoans.map((loan) => {
                        const book = getBookDetails(loan.bookId);
                        return (
                          <div
                            key={loan.id}
                            className="py-4 flex justify-between items-center group hover:bg-stone-50 transition px-2 rounded-lg"
                          >
                            <div>
                              <h3 className="font-bold text-gray-800">
                                {book?.title}
                              </h3>
                              <p className="text-xs text-stone-500 mt-1">
                                <span className="inline-block mr-3">
                                  Dipinjam: {loan.loanDate}
                                </span>
                                <span>Dikembalikan: {loan.dueDate}</span>
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold shadow-sm">
                              Selesai
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-stone-500 text-sm text-center py-4">
                      Belum ada riwayat peminjaman.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 animate-fade-in">
                <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Settings className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Pengaturan Profil
                  </h2>
                </div>

                <form onSubmit={handleUpdateProfile} className="max-w-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                        required
                      />
                    </div>

                    <div className="pt-4 border-t border-stone-100 mt-4">
                      <h3 className="text-sm font-bold text-stone-800 mb-3">
                        Ganti Password
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">
                            Password Baru
                          </label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            placeholder="Kosongkan jika tidak ingin mengubah"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">
                            Konfirmasi Password
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            placeholder="Ulangi password baru"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition shadow-md disabled:opacity-70 flex items-center gap-2"
                      >
                        {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
