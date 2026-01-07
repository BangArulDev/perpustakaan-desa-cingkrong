import { ArrowRight, Book, Users, Clock, Sparkles, CheckCircle2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const userSession = JSON.parse(localStorage.getItem("userSession") || "null");

  return (
    <div className="flex flex-col bg-white min-h-screen text-slate-900 overflow-x-hidden">
      {/* Hero Section - Clean & Airy */}
      <section className="relative min-h-[90vh] flex items-center bg-[#F8FAFC]">
        {/* Subtle Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-20 hidden lg:block" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 mb-8">
                <Sparkles size={16} className="text-primary" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Literasi Desa Digital</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
                Akses Ilmu <br />
                <span className="text-primary">Tanpa Batas</span>
              </h1>
              
              <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
                Platform perpustakaan digital Desa Cingkrong yang memudahkan warga mengakses koleksi buku, riset, dan literatur dari mana saja.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/katalog"
                  className="flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20"
                >
                  Jelajahi Katalog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to={userSession ? "/profile" : "/daftar"}
                  className="flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all shadow-sm"
                >
                  {userSession ? "Dashboard Saya" : "Daftar Anggota"}
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1481627526689-510ef0475661?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-[600px] object-cover"
                  alt="Library"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-[280px] z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="font-bold text-slate-800 tracking-tight">Proses Cepat & Mudah</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">Pinjam buku secara daring dan ambil langsung di perpustakaan desa.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Features - Ultra Clean */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: Book,
                title: "Koleksi Beragam",
                desc: "Mulai dari teknik pertanian modern hingga literatur anak-anak.",
                accent: "text-primary"
              },
              {
                icon: Clock,
                title: "Reservasi Online",
                desc: "Pesan buku kapan saja melalui aplikasi dan pantau status peminjaman.",
                accent: "text-blue-500"
              },
              {
                icon: Users,
                title: "Komunitas Belajar",
                desc: "Wadah interaksi antar warga untuk berbagi ilmu dan pengalaman.",
                accent: "text-emerald-500"
              },
            ].map((item, index) => (
              <div key={index} className="space-y-6">
                <div className={`${item.accent} mb-4`}>
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-slate-100 pl-4">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section - Minimalist Contrast */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Misi Literasi</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Membangun Masa Depan Desa Cingkrong Melalui Pengetahuan</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Inklusivitas Digital</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Kami memastikan setiap warga memiliki akses yang sama terhadap informasi berkualitas tanpa hambatan jarak.</p>
            </div>
            <div className="p-10 bg-primary rounded-[2rem] text-white space-y-4 shadow-xl shadow-primary/20">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white">
                <Search size={24} />
              </div>
              <h4 className="text-xl font-bold">Pencarian Pintar</h4>
              <p className="text-white/80 text-sm leading-relaxed">Sistem katalog yang memudahkan Anda menemukan judul buku atau topik spesifik dalam hitungan detik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Simple & Focused */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
              Mulai Petualangan Literasi Anda
            </h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">
              Bergabunglah dengan ratusan warga lainnya yang sudah terdaftar. Gratis, cepat, dan bermanfaat.
            </p>
            <Link
              to={userSession ? "/katalog" : "/daftar"}
              className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              {userSession ? "Cari Koleksi Buku" : "Daftar Anggota Sekarang"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}