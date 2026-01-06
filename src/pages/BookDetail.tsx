import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Book as BookIcon, User, Layers, Box, Info, CheckCircle2, AlertCircle, Share2 } from "lucide-react";
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
    <div className="bg-background min-h-screen pb-20">
      {/* Decorative Header Background */}
      <div className="h-64 bg-gradient-to-b from-secondary/40 to-background border-b border-white/5" />

      <div className="container mx-auto px-6 -mt-48">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-stone-400 hover:text-primary-light mb-8 transition-colors group"
        >
          <div className="p-2 bg-background/50 backdrop-blur-md rounded-lg mr-3 border border-white/10 group-hover:border-primary/50">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-wide uppercase text-xs">Kembali ke Katalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Cover & Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 xl:col-span-3"
          >
            <div className="sticky top-28">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-b from-primary to-accent blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-surface rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md border border-white/20 text-white ${
                      book.stock > 0 ? "bg-primary/80" : "bg-accent/80"
                    }`}>
                      {book.stock > 0 ? "Tersedia" : "Habis"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <button
                  onClick={handleBorrow}
                  disabled={book.stock <= 0}
                  className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-xl ${
                    book.stock > 0
                      ? "bg-accent hover:bg-accent-dark text-white shadow-accent/20"
                      : "bg-stone-800 text-stone-500 cursor-not-allowed border border-white/5 shadow-none"
                  }`}
                >
                  <BookIcon size={18} />
                  {book.stock > 0 ? "Pinjam Buku Ini" : "Stok Tidak Tersedia"}
                </button>
                
                <button className="w-full py-4 bg-surface hover:bg-white/5 text-white font-bold rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} /> Bagikan Koleksi
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 xl:col-span-9"
          >
            <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              {/* Header Info */}
              <div className="mb-10 border-b border-white/5 pb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border border-primary/20">
                    {book.category}
                  </span>
                  <div className="h-1 w-1 bg-stone-600 rounded-full" />
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-widest">ID: #CING-{book.id}024</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6 leading-tight">
                  {book.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-full border border-white/5">
                      <User className="h-5 w-5 text-primary-light" />
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase font-black tracking-tighter">Penulis / Author</p>
                      <p className="text-white font-bold">{book.author}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-full border border-white/5">
                      <Box className="h-5 w-5 text-primary-light" />
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase font-black tracking-tighter">Status Stok</p>
                      <p className="text-white font-bold">{book.stock} Exemplar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                <div className="xl:col-span-2">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                    <Info className="text-primary-light" size={20} />
                    Ringkasan Buku
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-stone-400 leading-loose text-lg">
                      Sesuai dengan visi Desa Cingkrong untuk meningkatkan literasi, buku ini hadir sebagai salah satu koleksi unggulan. 
                      Isinya mencakup wawasan mendalam yang relevan dengan kebutuhan masyarakat saat ini. 
                      Melalui narasi yang kuat dan data yang akurat, pembaca akan diajak untuk memahami lebih jauh mengenai topik ini dalam konteks yang modern dan aplikatif.
                    </p>
                    <p className="text-stone-400 leading-loose text-lg mt-4">
                      Cocok untuk mahasiswa, praktisi, maupun warga yang ingin memperluas cakrawala berpikir. 
                      Jangan lewatkan kesempatan untuk mengeksplorasi ilmu dari salah satu penulis terbaik di kategorinya.
                    </p>
                  </div>
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                  <div className="bg-background/50 border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-primary-light" />
                      Aturan Pinjam
                    </h4>
                    <ul className="text-xs text-stone-400 space-y-3">
                      <li className="flex gap-2"><span>•</span> Durasi peminjaman maksimal 7 hari kerja.</li>
                      <li className="flex gap-2"><span>•</span> Perpanjangan dapat dilakukan 1x via profil.</li>
                      <li className="flex gap-2"><span>•</span> Keterlambatan dikenakan sanksi administrasi desa.</li>
                    </ul>
                  </div>

                  {book.stock <= 0 && (
                    <div className="bg-accent/10 border border-accent/20 p-6 rounded-2xl flex flex-col gap-3">
                      <AlertCircle className="text-accent-light" size={24} />
                      <p className="text-xs font-bold text-accent-light uppercase">Pemberitahuan</p>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Maaf, semua unit buku ini sedang dalam masa pinjam anggota lain. Silakan tambahkan ke daftar tunggu atau cek secara berkala.
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