import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  MoreVertical,
  Shield,
} from "lucide-react";

// Mock Data
const INITIAL_MEMBERS = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    role: "Warga",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Siti Aminah",
    email: "siti.aminah@email.com",
    role: "Mahasiswa",
    status: "pending",
    joinDate: "2024-03-10",
  },
  {
    id: 3,
    name: "Ahmad Rizky",
    email: "ahmad.rizky@email.com",
    role: "Pelajar",
    status: "active",
    joinDate: "2024-02-22",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    role: "Warga",
    status: "blocked",
    joinDate: "2023-12-05",
  },
];

export default function ManageMembers() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (id: number, newStatus: string) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary-dark">
            Kelola Anggota
          </h1>
          <p className="text-text-secondary">
            Verifikasi dan kelola data anggota perpustakaan.
          </p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-sm border border-stone-100 flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500 uppercase px-2">
            Total: {members.length}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex items-center gap-3">
        <Search className="text-stone-400" size={20} />
        <input
          type="text"
          placeholder="Cari nama atau email..."
          className="flex-1 outline-none text-text-primary placeholder:text-stone-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                  Nama Lengkap
                </th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                  Peran
                </th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                  Tanggal Gabung
                </th>
                <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-stone-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-text-primary">
                        {member.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {member.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-secondary" />
                      <span className="text-text-primary text-sm">
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        member.status === "active"
                          ? "bg-green-100 text-green-700"
                          : member.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {member.status === "active" && <CheckCircle size={12} />}
                      {member.status === "blocked" && <XCircle size={12} />}
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary text-sm">
                    {new Date(member.joinDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.status === "pending" && (
                        <button
                          onClick={() =>
                            handleStatusChange(member.id, "active")
                          }
                          className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm transition-colors"
                        >
                          Verifikasi
                        </button>
                      )}
                      {member.status === "active" && (
                        <button
                          onClick={() =>
                            handleStatusChange(member.id, "blocked")
                          }
                          className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                          title="Blokir Anggota"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      {member.status === "blocked" && (
                        <button
                          onClick={() =>
                            handleStatusChange(member.id, "active")
                          }
                          className="text-green-600 hover:bg-green-50 p-2 rounded transition"
                          title="Aktifkan Kembali"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="text-stone-400 hover:text-secondary p-2 rounded hover:bg-stone-100 transition">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMembers.length === 0 && (
            <div className="p-12 text-center text-stone-500">
              Data anggota tidak ditemukan.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
