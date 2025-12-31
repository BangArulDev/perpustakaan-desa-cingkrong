import { Book, Users, Clock, AlertCircle, Layers } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function Dashboard() {
  const { books, members, loans, returnBook } = useData();

  // Realtime Stats
  const totalBooks = books.reduce((sum, b) => sum + b.stock, 0);
  const activeMembers = members.filter((m) => m.status === "active").length;
  // Calculate based on active loans (borrowed or overdue)
  const borrowedBooks = loans.filter(
    (l) => l.status === "borrowed" || l.status === "overdue"
  ).length;
  const overdueBooks = loans.filter((l) => l.status === "overdue").length;

  // Stats Configuration
  const stats = [
    {
      label: "Total Judul",
      value: books.length.toLocaleString(),
      icon: Book,
      color: "bg-primary-light",
      textColor: "text-primary-dark",
    },
    {
      label: "Total Eksemplar",
      value: totalBooks.toLocaleString(),
      icon: Layers,
      color: "bg-emerald-100",
      textColor: "text-emerald-800",
    },
    {
      label: "Anggota Aktif",
      value: activeMembers.toLocaleString(),
      icon: Users,
      color: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      label: "Buku Dipinjam",
      value: borrowedBooks.toString(),
      icon: Clock,
      color: "bg-secondary/20",
      textColor: "text-secondary",
    },
    {
      label: "Jatuh Tempo",
      value: overdueBooks.toString(),
      icon: AlertCircle,
      color: "bg-red-100",
      textColor: "text-red-800",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary-dark">
            Dashboard Overview
          </h1>
          <p className="text-text-secondary">Statistik perpustakaan terkini.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow">
          Download Laporan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-start justify-between"
          >
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-text-primary">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3 rounded-lg ${stat.color} ${stat.textColor}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Mockup -> Realtime Loans */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
        <h3 className="font-bold text-lg text-primary-dark mb-4">
          Peminjaman Terbaru
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-200 text-text-secondary text-sm">
                <th className="pb-3 font-medium">Anggota</th>
                <th className="pb-3 font-medium">Buku</th>
                <th className="pb-3 font-medium">Tanggal Pinjam</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm text-text-primary">
              {loans.map((loan) => {
                const member = members.find((m) => m.id === loan.memberId);
                const book = books.find((b) => b.id === loan.bookId);

                return (
                  <tr
                    key={loan.id}
                    className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
                  >
                    <td className="py-4 font-medium">
                      {member ? member.name : "Unknown Member"}
                    </td>
                    <td className="py-4 text-text-secondary">
                      {book ? book.title : "Unknown Book"}
                    </td>
                    <td className="py-4">
                      {new Date(loan.loanDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                          loan.status === "borrowed"
                            ? "bg-blue-100 text-blue-700"
                            : loan.status === "returned"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {loan.status === "borrowed"
                          ? "Dipinjam"
                          : loan.status === "returned"
                          ? "Dikembalikan"
                          : "Terlambat"}
                      </span>
                    </td>
                    <td className="py-4">
                      {loan.status !== "returned" && (
                        <button
                          onClick={() => {
                            if (
                              confirm("Apakah buku ini sudah dikembalikan?")
                            ) {
                              returnBook(loan.id, loan.bookId);
                            }
                          }}
                          className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-xs transition"
                        >
                          Kembalikan
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
