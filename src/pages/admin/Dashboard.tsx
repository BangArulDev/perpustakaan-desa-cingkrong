import {
  Book,
  Users,
  Clock,
  AlertCircle,
  Layers,
  Download,
  CheckCircle2,
} from "lucide-react";
import { useData } from "../../context/DataContext";

export default function Dashboard() {
  const { books, members, loans, returnBook } = useData();

  const totalBooks = books.reduce((sum, b) => sum + b.stock, 0);
  const activeMembers = members.filter((m) => m.status === "active").length;
  const borrowedBooks = loans.filter(
    (l) => l.status === "borrowed" || l.status === "overdue"
  ).length;
  const overdueBooks = loans.filter((l) => l.status === "overdue").length;

  const stats = [
    {
      label: "Total Judul",
      value: books.length,
      icon: Book,
      color: "text-primary",
    },
    {
      label: "Eksemplar",
      value: totalBooks,
      icon: Layers,
      color: "text-emerald-600",
    },
    {
      label: "Anggota",
      value: activeMembers,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Dipinjam",
      value: borrowedBooks,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Terlambat",
      value: overdueBooks,
      icon: AlertCircle,
      color: "text-accent",
    },
  ];

  return (
    <div className="w-full space-y-12">
      {/* Header Sederhana - Konsisten dengan Settings & Manage Books */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Ringkasan Statistik
          </h1>
          <p className="text-slate-500 text-sm">
            Dashboard Admin Perpustakaan Desa Cingkrong
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95">
          <Download size={16} />
          Export Laporan
        </button>
      </div>

      {/* Stats Grid - Ultra Clean, Menggunakan Label Mikro & Border-b */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="space-y-3 pb-4 border-b border-transparent hover:border-slate-100 transition-colors group"
          >
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
              <stat.icon size={16} className={stat.color} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 tabular-nums leading-none">
              {stat.value.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      {/* Activity Table Area - Tanpa Box/Card */}
      <div className="w-full space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-800 tracking-tight">
            Aktivitas Peminjaman
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {loans.length} Transaksi Terdata
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="py-4 pr-6">Info Anggota</th>
                <th className="py-4 px-6">Buku Terpinjam</th>
                <th className="py-4 px-6 text-center">Status Sesi</th>
                <th className="py-4 pl-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
              {loans.map((loan) => {
                const member = members.find((m) => m.id === loan.memberId);
                const book = books.find((b) => b.id === loan.bookId);

                return (
                  <tr
                    key={loan.id}
                    className="group hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="py-5 pr-6">
                      <div className="font-bold text-slate-700 group-hover:text-primary transition-colors">
                        {member?.name || "N/A"}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {member?.email}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-slate-500 font-medium">
                      {book?.title || "Data Buku Tidak Ada"}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-center">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${
                            loan.status === "borrowed"
                              ? "text-blue-500"
                              : loan.status === "returned"
                              ? "text-primary"
                              : "text-accent"
                          }`}
                        >
                          {loan.status === "borrowed"
                            ? "• Sedang Dipinjam"
                            : loan.status === "returned"
                            ? "• Sudah Kembali"
                            : "• Terlambat"}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 pl-6 text-right">
                      {loan.status !== "returned" ? (
                        <button
                          onClick={() => returnBook(loan.id, loan.bookId)}
                          className="text-primary hover:text-primary-dark font-black text-[10px] uppercase tracking-widest underline-offset-4 hover:underline"
                        >
                          Selesaikan Peminjaman
                        </button>
                      ) : (
                        <div className="flex justify-end pr-2">
                          <CheckCircle2 size={16} className="text-slate-200" />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loans.length === 0 && (
            <div className="w-full py-20 text-center border-t border-slate-50">
              <p className="text-slate-400 text-sm italic font-medium">
                Belum ada aktivitas transaksi hari ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
