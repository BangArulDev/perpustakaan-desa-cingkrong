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
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { loans, books } = useData();
  const [activeTab, setActiveTab] = useState<"card" | "loans" | "settings">("card");

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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <p className="text-slate-400 font-medium mb-4">Sesi tidak ditemukan atau akses ditolak.</p>
          <button onClick={() => navigate("/login")} className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest">
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      const updatedUser = { ...user, name: formData.name, email: formData.email };
      localStorage.setItem("userSession", JSON.stringify(updatedUser));
      alert("Profil berhasil diperbarui!");
      setIsSaving(false);
      window.location.reload();
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const userLoans = loans.filter((loan) => loan.memberId === user.id);
  const activeLoans = userLoans.filter((loan) => loan.status === "borrowed" || loan.status === "overdue");
  const historyLoans = userLoans.filter((loan) => loan.status === "returned");
  const overdueLoans = userLoans.filter((loan) => loan.status === "overdue");
  const getBookDetails = (bookId: number) => books.find((b) => b.id === bookId);

  // Reader Level Logic
  let readerLevel = "Pembaca Pemula";
  let levelClass = "from-emerald-400 to-emerald-600";
  const completedLoansCount = historyLoans.length;
  const totalPoints = completedLoansCount * 10;

  if (completedLoansCount > 10) {
    readerLevel = "Kutu Buku";
    levelClass = "from-amber-400 to-orange-500";
  } else if (completedLoansCount >= 3) {
    readerLevel = "Pembaca Aktif";
    levelClass = "from-primary to-blue-600";
  }

  const labelClass = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block";
  const inputClass = "w-full px-0 py-3 bg-transparent border-b border-slate-100 focus:border-primary outline-none transition text-slate-700 font-medium placeholder:text-slate-300 mb-6";

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Dynamic Background */}
      <div className="h-64 bg-[#F8FAFC] border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-10 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 -mt-40 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Profile & Nav */}
          <div className="lg:w-1/3 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100 relative group">
                  <User className="text-slate-300" size={40} />
                  <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl text-white shadow-lg">
                    <Award size={16} />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">{user.name}</h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full mb-8">
                  ID: #{user.id.toString().padStart(4, '0')}
                </span>

                <div className="w-full space-y-2">
                  <NavItem icon={<CreditCard size={18} />} label="Kartu Anggota" active={activeTab === "card"} onClick={() => setActiveTab("card")} />
                  <NavItem icon={<History size={18} />} label="Riwayat Pinjam" active={activeTab === "loans"} onClick={() => setActiveTab("loans")} />
                  <NavItem icon={<Settings size={18} />} label="Edit Profil" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
                  <div className="pt-6 mt-4 border-t border-slate-50">
                    <button onClick={handleLogout} className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-accent hover:bg-accent/5 transition-all text-[11px] font-black uppercase tracking-widest">
                      <LogOut size={18} /> Keluar Sesi
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === "card" && (
                <motion.div key="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  {/* Digital Card - Ultra Premium */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white">
                    <div className="flex items-center gap-2 mb-10">
                      <Sparkles size={16} className="text-primary" />
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Kartu Digital Aktif</h3>
                    </div>

                    <div className={`w-full max-w-md mx-auto aspect-[1.6/1] bg-gradient-to-br ${levelClass} rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/30 group`}>
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:scale-110" />
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                              <Library size={24} />
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest leading-none">
                              Cingkrong<br/><span className="text-white/60">Digital Lib</span>
                            </div>
                          </div>
                          <div className="text-[8px] font-black bg-white/20 px-3 py-1.5 rounded-full tracking-widest">PREMIUM ACCESS</div>
                        </div>
                        
                        <div>
                          <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest mb-1">Nama Lengkap</p>
                          <h2 className="text-2xl font-bold tracking-tight mb-4">{user.name}</h2>
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Reader Level</p>
                              <p className="text-xs font-black uppercase tracking-widest text-white">{readerLevel}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] font-bold text-white/60 uppercase tracking-widest">Member ID</p>
                              <p className="font-mono text-xs">{user.id.toString().padStart(6, '0')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 flex justify-center">
                      <button onClick={() => window.print()} className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                        <Printer size={16} /> Cetak Kartu Fisik
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    <StatBox label="Aktif" value={activeLoans.length} color="text-primary" />
                    <StatBox label="Selesai" value={completedLoansCount} color="text-emerald-500" />
                    <StatBox label="Point" value={totalPoints} color="text-orange-500" />
                  </div>
                </motion.div>
              )}

              {activeTab === "loans" && (
                <motion.div key="loans" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Peminjaman Aktif</h3>
                      <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest">{activeLoans.length} Buku</span>
                    </div>

                    {activeLoans.length > 0 ? (
                      <div className="space-y-4">
                        {activeLoans.map((loan) => {
                          const book = getBookDetails(loan.bookId);
                          return (
                            <div key={loan.id} className="flex items-center p-4 rounded-3xl bg-slate-50/50 border border-slate-50 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
                              <img src={book?.cover} className="w-16 h-20 object-cover rounded-xl shadow-sm" alt="" />
                              <div className="ml-6 flex-grow">
                                <h4 className="text-sm font-bold text-slate-800 mb-1">{book?.title}</h4>
                                <div className="flex gap-4">
                                  <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <Clock size={12} className="mr-1" /> Tempo: {loan.dueDate}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${loan.status === 'overdue' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                                {loan.status === 'overdue' ? 'Terlambat' : 'Dipinjam'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                        <BookOpen className="mx-auto text-slate-200 mb-4" size={40} />
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Belum ada buku aktif</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-12">Informasi Akun</h3>
                    <form onSubmit={handleUpdateProfile} className="max-w-md">
                      <div className="space-y-2">
                        <label className={labelClass}>Nama Lengkap</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} required />
                      </div>
                      <div className="space-y-2">
                        <label className={labelClass}>Email Terdaftar</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} required />
                      </div>
                      <div className="pt-8">
                        <button type="submit" disabled={isSaving} className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50">
                          {isSaving ? "Menyimpan..." : "Update Profil"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner structure
function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl transition-all ${active ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-400 hover:bg-slate-50"}`}>
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight size={14} className={active ? "opacity-100" : "opacity-0"} />
    </button>
  );
}

function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 text-center shadow-sm">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}