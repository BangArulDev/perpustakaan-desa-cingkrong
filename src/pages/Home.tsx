import { ArrowRight, Book, Users, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const userSession = JSON.parse(localStorage.getItem("userSession") || "null");

  return (
    <div className="flex flex-col bg-background min-h-screen text-white/90">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1507842217121-9e691b2d0941?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-40"
            alt="Library Background"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary-light px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-primary/30">
              <Sparkles size={16} />
              <span>Pusat Literasi Digital Cingkrong</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-[1.1]">
              Temukan Dunia di <br />
              <span className="text-primary-light relative">
                Genggaman Anda
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-300 mb-10 leading-relaxed max-w-2xl">
              Akses ribuan koleksi buku, jurnal, dan karya ilmiah untuk membangun masa depan Desa Cingkrong yang lebih cerdas dan inovatif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/katalog"
                className="group flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-primary/20"
              >
                <Book className="mr-2 h-5 w-5" />
                Jelajahi Katalog
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to={userSession ? "/profile" : "/daftar"}
                className="flex items-center justify-center px-8 py-4 bg-surface hover:bg-white/10 border border-white/20 text-white font-bold rounded-xl transition-all"
              >
                <Users className="mr-2 h-5 w-5" />
                {userSession ? "Dashboard Anggota" : "Gabung Anggota"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Cards - Floating on Dark Background */}
      <section className="relative z-30 px-6 -mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Book,
                title: "Koleksi Lengkap",
                desc: "Dari literatur pertanian hingga teknologi terbaru untuk warga.",
                color: "text-primary-light"
              },
              {
                icon: Clock,
                title: "Layanan 24/7",
                desc: "Akses katalog dan reservasi buku kapan saja secara online.",
                color: "text-accent-light"
              },
              {
                icon: Users,
                title: "Ruang Komunitas",
                desc: "Wadah diskusi dan belajar bersama untuk segala usia.",
                color: "text-primary-light"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl hover:border-primary/50 transition-colors group"
              >
                <div className={`p-3 rounded-xl bg-background w-fit mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Using Surface Contrast */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Reading"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-primary-light font-bold tracking-widest uppercase text-sm mb-4">Visi & Misi Kami</h2>
              <h3 className="text-4xl font-bold font-serif text-white mb-8 leading-tight">
                Mencerdaskan Kehidupan Desa <br /> Melalui Literasi Digital
              </h3>
              
              <div className="space-y-6">
                <div className="bg-surface/50 p-6 rounded-2xl border-l-4 border-primary">
                  <h4 className="flex items-center font-bold text-xl text-white mb-3">
                    <CheckCircle2 className="mr-2 text-primary-light" size={20} /> Visi Utama
                  </h4>
                  <p className="text-stone-400">
                    Menjadi pusat ilmu pengetahuan berbasis digital yang inklusif untuk seluruh warga Desa Cingkrong.
                  </p>
                </div>
                
                <div className="bg-surface/50 p-6 rounded-2xl border-l-4 border-accent">
                  <h4 className="flex items-center font-bold text-xl text-white mb-3">
                    <CheckCircle2 className="mr-2 text-accent-light" size={20} /> Misi Strategis
                  </h4>
                  <ul className="grid grid-cols-1 gap-3 text-stone-400">
                    <li className="flex items-start gap-2 italic">"Mempermudah akses informasi dan bahan bacaan berkualitas secara merata."</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Primary */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">
            Siap Menjadi Bagian dari Perubahan?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            Daftar sekarang untuk meminjam buku secara online dan pantau riwayat bacaan Anda dengan mudah.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={userSession ? "/katalog" : "/daftar"}
              className="px-10 py-4 bg-background hover:bg-secondary text-white font-bold rounded-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95"
            >
              {userSession ? "Cari Buku Sekarang" : "Daftar Gratis"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}