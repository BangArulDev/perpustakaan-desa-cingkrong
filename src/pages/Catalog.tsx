import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen, ChevronRight, Info } from "lucide-react";
import { useData } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "Semua",
  "Pertanian",
  "Teknologi",
  "Fiksi",
  "Agama",
  "Anak",
  "Pendidikan",
];

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
    // Disarankan menggunakan toast notification kedepannya
    alert("Buku berhasil dipinjam! Cek riwayat peminjaman di profil Anda.");
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-secondary/30 border-b border-white/5 py-16 mb-12">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
              E-Katalog <span className="text-primary-light">Perpustakaan</span>
            </h1>
            <p className="text-stone-400 text-lg">
              Jelajahi ribuan koleksi buku fisik dan digital milik Desa Cingkrong. 
              Pinjam secara online, baca secara nyata.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Search & Filter Bar */}
        <div className="sticky top-20 z-40 bg-surface/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl mb-12 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-light h-5 w-5" />
            <input
              type="text"
              placeholder="Cari judul, penulis, atau ISBN..."
              className="w-full pl-12 pr-4 py-3 bg-background border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-3 w-full lg:w-auto overflow-x-auto no-scrollbar py-1">
            <Filter className="text-stone-400 h-5 w-5 flex-shrink-0" />
            <div className="flex space-x-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-background text-stone-400 hover:text-white border border-white/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, index) => (
              <motion.div
                layout
                key={book.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
              >
                {/* Cover Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                  
                  {/* Badge Stock */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest font-black text-white shadow-xl backdrop-blur-md ${
                        book.stock > 0 ? "bg-primary/80" : "bg-accent/80"
                      }`}
                    >
                      {book.stock > 0 ? `${book.stock} Tersedia` : "Habis"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-primary-light bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      {book.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-primary-light transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  
                  <p className="text-sm text-stone-400 mb-6 flex-grow italic">
                    by {book.author}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      to={`/book/${book.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-background hover:bg-white/5 text-white text-sm font-bold rounded-xl border border-white/10 transition-all"
                    >
                      <Info size={16} /> Detail
                    </Link>
                    <button
                      onClick={() => handleBorrow(book.id)}
                      disabled={book.stock <= 0}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
                        book.stock > 0
                          ? "bg-accent hover:bg-accent-dark text-white shadow-accent/20 active:scale-95"
                          : "bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5"
                      }`}
                    >
                      <BookOpen size={16} /> {book.stock > 0 ? "Pinjam" : "Kosong"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-surface/30 rounded-3xl border-2 border-dashed border-white/10"
          >
            <div className="bg-background w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-stone-600 h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Buku Tidak Ditemukan</h3>
            <p className="text-stone-400 mb-8 max-w-sm mx-auto">
              Maaf, kami tidak dapat menemukan buku dengan kata kunci tersebut. Coba kategori lain?
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Semua");
              }}
              className="text-primary-light font-bold hover:text-white flex items-center gap-2 mx-auto transition-colors"
            >
              Reset Filter <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}