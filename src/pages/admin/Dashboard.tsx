import { Book, Users, Clock, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Buku",
      value: "1,240",
      icon: Book,
      color: "bg-primary-light",
      textColor: "text-primary-dark",
    },
    {
      label: "Anggota Aktif",
      value: "584",
      icon: Users,
      color: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      label: "Buku Dipinjam",
      value: "86",
      icon: Clock,
      color: "bg-secondary/20",
      textColor: "text-secondary",
    },
    {
      label: "Jatuh Tempo",
      value: "12",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Recent Activity Mockup */}
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
              </tr>
            </thead>
            <tbody className="text-sm text-text-primary">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr
                  key={i}
                  className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
                >
                  <td className="py-4 font-medium">Budi Santoso</td>
                  <td className="py-4 text-text-secondary">
                    Laskar Pelangi {i}
                  </td>
                  <td className="py-4">12 Jan 2024</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      Dipinjam
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
