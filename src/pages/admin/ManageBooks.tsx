import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const INITIAL_BOOKS = [
  {
    id: 1,
    title: "Teknologi Tepat Guna",
    author: "Dr. Ir. Suharso",
    category: "Pertanian",
    stock: 5,
  },
  {
    id: 2,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    stock: 3,
  },
  {
    id: 3,
    title: "Sejarah Islam",
    author: "Prof. Hasan",
    category: "Agama",
    stock: 8,
  },
];

export default function ManageBooks() {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    stock: 1,
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooks([
      ...books,
      { id: Date.now(), ...newBook, stock: Number(newBook.stock) },
    ]);
    setIsModalOpen(false);
    setNewBook({ title: "", author: "", category: "", stock: 1 });
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus buku ini?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-primary-dark">
            Kelola Buku
          </h1>
          <p className="text-text-secondary">
            Daftar koleksi buku perpustakaan.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Plus size={18} />
          Tambah Buku
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex items-center gap-3">
        <Search className="text-stone-400" size={20} />
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          className="flex-1 outline-none text-text-primary placeholder:text-stone-400"
        />
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                Judul
              </th>
              <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                Penulis
              </th>
              <th className="px-6 py-4 font-semibold text-text-secondary text-sm">
                Kategori
              </th>
              <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-center">
                Stok
              </th>
              <th className="px-6 py-4 font-semibold text-text-secondary text-sm text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium text-text-primary">
                  {book.title}
                </td>
                <td className="px-6 py-4 text-text-secondary">{book.author}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary-dark rounded text-xs font-semibold uppercase">
                    {book.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold text-text-primary">
                  {book.stock}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {books.length === 0 && (
          <div className="p-8 text-center text-stone-500">Belum ada buku.</div>
        )}
      </div>

      {/* Add Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold font-serif text-primary-dark mb-4">
              Tambah Buku Baru
            </h3>
            <form onSubmit={handleAddBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Judul Buku
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Penulis
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-primary outline-none"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Kategori
                  </label>
                  <select
                    className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-primary outline-none bg-white"
                    value={newBook.category}
                    onChange={(e) =>
                      setNewBook({ ...newBook, category: e.target.value })
                    }
                  >
                    <option value="">Pilih...</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="Teknologi">Teknologi</option>
                    <option value="Agama">Agama</option>
                    <option value="Fiksi">Fiksi</option>
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Stok
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-2 border border-stone-300 rounded focus:ring-2 focus:ring-primary outline-none"
                    value={newBook.stock}
                    onChange={(e) =>
                      setNewBook({ ...newBook, stock: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 text-stone-600 hover:bg-stone-100 rounded font-medium transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded font-medium shadow-md hover:shadow-lg transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
