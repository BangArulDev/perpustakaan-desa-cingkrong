import { useState } from "react";
import { Plus, Search, Edit2, Trash, X, BookOpen, Save } from "lucide-react";
import { useData } from "../../context/DataContext";

export default function ManageBooks() {
  const { books, addBook, deleteBook } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBook, setNewBook] = useState({ title: "", author: "", category: "", stock: 1 });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    addBook({ ...newBook, stock: Number(newBook.stock), cover: "default-cover.jpg" });
    setIsModalOpen(false);
    setNewBook({ title: "", author: "", category: "", stock: 1 });
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-8">
      {/* Header Sederhana - Konsisten dengan Dashboard/Settings */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Kelola Buku</h1>
          <p className="text-slate-500 text-sm">Daftar koleksi buku perpustakaan.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95"
        >
          <Plus size={18} />
          Tambah Buku
        </button>
      </div>

      {/* Control Bar - Search Minimalis */}
      <div className="relative group">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
        <input
          type="text"
          placeholder="Cari judul atau penulis buku..."
          className="w-full pl-8 py-3 bg-transparent border-b border-slate-200 outline-none focus:border-primary transition-colors text-sm font-medium text-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabel Koleksi - Ultra Clean */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="py-4 pr-6">Info Koleksi</th>
              <th className="py-4 px-6">Kategori</th>
              <th className="py-4 px-6 text-center">Stok</th>
              <th className="py-4 pl-6 text-right">Manajemen</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-50">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="group hover:bg-slate-50/30 transition-colors">
                <td className="py-5 pr-6">
                  <div className="font-bold text-slate-700 group-hover:text-primary transition-colors">{book.title}</div>
                  <div className="text-[11px] text-slate-400 font-medium italic mt-0.5">{book.author}</div>
                </td>
                <td className="py-5 px-6">
                  <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-tighter">
                    {book.category}
                  </span>
                </td>
                <td className="py-5 px-6 text-center">
                  <span className={`font-mono font-bold ${book.stock < 3 ? 'text-accent' : 'text-slate-600'}`}>
                    {book.stock}
                  </span>
                </td>
                <td className="py-5 pl-6 text-right">
                  <div className="flex justify-end gap-3">
                    <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => { if(confirm("Hapus buku?")) deleteBook(book.id) }}
                      className="p-2 text-slate-300 hover:text-accent transition-colors"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredBooks.length === 0 && (
          <div className="w-full py-20 text-center flex flex-col items-center gap-3">
            <BookOpen size={40} className="text-slate-100" />
            <p className="text-slate-400 text-sm font-medium italic">Tidak ada koleksi yang ditemukan.</p>
          </div>
        )}
      </div>

      {/* Modal - Konsisten dengan Input-B Style */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-[2px]">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Tambah Koleksi</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddBook} className="p-8 space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Judul Buku</label>
                  <input
                    required
                    type="text"
                    className="w-full py-2 bg-transparent border-b border-slate-200 outline-none focus:border-primary text-sm font-medium text-slate-700 transition-colors"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nama Penulis</label>
                  <input
                    required
                    type="text"
                    className="w-full py-2 bg-transparent border-b border-slate-200 outline-none focus:border-primary text-sm font-medium text-slate-700 transition-colors"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Kategori</label>
                    <select
                      required
                      className="w-full py-2 bg-transparent border-b border-slate-200 outline-none focus:border-primary text-sm font-medium text-slate-700 transition-colors appearance-none cursor-pointer"
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    >
                      <option value="">Pilih...</option>
                      <option value="Pertanian">Pertanian</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Agama">Agama</option>
                      <option value="Fiksi">Fiksi</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Stok</label>
                    <input
                      type="number"
                      className="w-full py-2 bg-transparent border-b border-slate-200 outline-none focus:border-primary text-sm font-bold text-slate-700 transition-colors"
                      value={newBook.stock}
                      onChange={(e) => setNewBook({ ...newBook, stock: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-black uppercase tracking-[0.1em] shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={14} />
                  Simpan Koleksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}