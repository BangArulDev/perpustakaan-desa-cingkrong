import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Book as BookIcon, User, Layers, Box, Info, CheckCircle2, AlertCircle, Share2, Sparkles } from "lucide-react";
import { useData } from "../context/DataContext";
import { useEffect, useState } from "react";
import { Book } from "../context/DataContext";
import { motion } from "framer-motion";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, borrowBook } = useData();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const foundBook = books.find((b) => b.id === parseInt(id));
      if (foundBook) {
        setBook(foundBook);
      } else {
        navigate("/katalog");
      }
    }
  }, [id, books, navigate]);

  const handleBorrow = () => {
    const session = localStorage.getItem("userSession");
    if (!session) {
      alert("Silakan login terlebih dahulu untuk meminjam buku.");
      navigate("/login");
      return;
    }

    if (book) {
      const user = JSON.parse(session);
      borrowBook(book.id, user.id);
      alert(`Buku "${book.title}" berhasil dipinjam!`);
      navigate("/profile");
    }
  };

  if (!book) return null;

  return (
    <div className="bg-white min-h-screen pb-24 text-slate-900">
      {/* Light Header Background */}
      <div className="h-[45vh] bg-[#F8FAFC] border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[40%] h-[120%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 -mt-72 relative z-10">
        {/* Simple Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-400 hover:text-primary mb-10 transition-colors group"
        >
          <div className="p-2 bg-white shadow-sm rounded-xl mr-4 border border-slate-100 group-hover:scale-110 transition-transform">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Kembali ke Koleksi</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Premium Cover Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 xl:col-span-4"
          >
            <div className="sticky top-32 space-y-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-slate-200/40 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-300 border-[12px] border-white">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20 text-white ${
                      book.stock > 0 ? "bg-slate-900/90" : "bg-accent/90"
                    }`}>
                      {book.stock > 0 ? "Available" : "Checked Out"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-4">
                <button
                  onClick={handleBorrow}
                  disabled={book.stock <= 0}
                  className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl ${
                    book.stock > 0
                      ? "bg-primary hover:bg-primary-dark text-white shadow-primary/20"
                      : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <BookIcon size={16} />
                  {book.stock > 0 ? "Ajukan Peminjaman" : "Stok Kosong"}
                </button>
                
                <button className="w-full py-5 bg-white hover:bg-slate-50 text-slate-500 font-black text-[11px] uppercase tracking-[0.2em] rounded-[1.5rem] border border-slate-100 transition-all flex items-center justify-center gap-3 shadow-sm">
                  <Share2 size={16} /> Bagikan Link
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Modern Info Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 xl:col-span-8"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50">
              {/* Top Meta */}
              <div className="mb-12 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                    {book.category}
                  </span>
                  <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Ref: #LB-{book.id}2026</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                  {book.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-10 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Penulis Utama</p>
                      <p className="text-slate-800 font-bold">{book.author}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100">
                      <Box size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Inventaris</p>
                      <p className="text-slate-800 font-bold">{book.stock} Eksemplar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Body */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 border-t border-slate-50 pt-12">
                <div className="xl:col-span-8 space-y-8">
                  <div className="flex items-center gap-3">
                    <Sparkles size={18} className="text-primary" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Ringkasan Materi</h3>
                  </div>
                  <div className="space-y-6 text-slate-500 text-lg leading-[1.8] font-medium italic">
                    <p>
                      Koleksi unggulan Perpustakaan Desa Cingkrong ini dirancang untuk memberikan wawasan aplikatif bagi warga. 
                      Isinya menggabungkan teori fundamental dengan implementasi praktis yang relevan dengan perkembangan zaman.
                    </p>
                    <p className="not-italic text-slate-600">
                      Melalui riset yang mendalam, buku ini menjadi referensi wajib bagi siapa saja yang ingin mendalami bidang {book.category.toLowerCase()}. 
                      Setiap bab disusun secara sistematis untuk memastikan pemahaman yang komprehensif.
                    </p>
                  </div>
                </div>

                {/* Regulation Sidebar */}
                <div className="xl:col-span-4 space-y-8">
                  <div className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-[2rem] space-y-6">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary" />
                      Prosedur
                    </h4>
                    <ul className="text-[11px] text-slate-500 font-bold space-y-4 uppercase tracking-wider">
                      <li className="flex gap-3">
                        <span className="text-primary">01</span>
                        <span>Maksimal 7 Hari</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary">02</span>
                        <span>Satu Kali Extend</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary">03</span>
                        <span>Wajib Jaga Fisik</span>
                      </li>
                    </ul>
                  </div>

                  {book.stock <= 0 && (
                    <div className="bg-accent/5 border border-accent/10 p-6 rounded-[2rem] flex flex-col gap-3">
                      <AlertCircle className="text-accent" size={20} />
                      <p className="text-[9px] font-black text-accent uppercase tracking-widest">Informasi Penting</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        Unit ini sedang dipinjam oleh anggota lain. Silakan reservasi melalui meja pustakawan.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}