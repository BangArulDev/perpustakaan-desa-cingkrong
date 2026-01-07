import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen, ChevronRight, Info, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["Semua", "Pertanian", "Teknologi", "Fiksi", "Agama", "Anak", "Pendidikan"];

export default function Catalog() {
  const navigate = useNavigate();
  const { books, borrowBook } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const handleBorrow = (bookId: number) => {
    const session = localStorage.getItem("userSession");
    if (!session) {
      alert("Silakan login terlebih dahulu untuk meminjam buku.");
      navigate("/login");
      return;
    }
    const user = JSON.parse(session);
    borrowBook(bookId, user.id);
    alert("Buku berhasil dipinjam! Cek riwayat di profil Anda.");
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Section - Clean & Consistent */}
      <div className="bg-[#F8FAFC] border-b border-slate-100 py-20 mb-12">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200 mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Katalog Digital</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Jelajahi <span className="text-primary">Koleksi</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Cari dan temukan ribuan literatur berkualitas. Pinjam secara daring, baca dengan tenang.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Search & Filter Bar - Floating Minimalist */}
        <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 mb-16 flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="text"
              placeholder="Cari judul, penulis, atau topik..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition text-slate-700 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar py-1 px-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-400 hover:text-slate-900 border border-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid - Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, index) => (
              <motion.div
                layout
                key={book.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col h-full"
              >
                {/* Visual Cover */}
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 mb-6 transition-all group-hover:shadow-2xl group-hover:shadow-slate-200 group-hover:-translate-y-2">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md ${
                      book.stock > 0 ? "bg-slate-900/80" : "bg-accent/80"
                    }`}>
                      {book.stock > 0 ? `${book.stock} Ready` : "Out"}
                    </span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex flex-col flex-grow px-2">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                    {book.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 leading-tight mb-1 group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-6">
                    by <span className="text-slate-500 italic">{book.author}</span>
                  </p>

                  {/* Minimalist Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      to={`/book/${book.id}`}
                      className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition-all"
                    >
                      <Info size={18} />
                    </Link>
                    <button
                      onClick={() => handleBorrow(book.id)}
                      disabled={book.stock <= 0}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        book.stock > 0
                          ? "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20"
                          : "bg-slate-100 text-slate-300 cursor-not-allowed"
                      }`}
                    >
                      <BookOpen size={14} /> {book.stock > 0 ? "Pinjam Buku" : "Kosong"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State - Minimalist */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-40">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-200" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Pencarian Tidak Ditemukan</h3>
            <p className="text-slate-400 text-sm mb-8">Maaf, buku yang Anda cari tidak tersedia saat ini.</p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("Semua"); }}
              className="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}