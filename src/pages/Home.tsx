import { ArrowRight, Book, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-dark text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-10" />
        {/* Placeholder image from Unsplash for library ambiance */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217121-9e691b2d0941?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center" />

        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Jendela Dunia di{" "}
              <span className="text-accent">Desa Cingkrong</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-200 mb-8 leading-relaxed max-w-2xl">
              Selamat datang di pusat literasi dan kreativitas masyarakat. Mari
              membaca, berkarya, dan berinovasi bersama Perpustakaan Desa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/katalog"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-accent-dark text-secondary font-bold rounded-lg transition duration-300 shadow-lg group"
              >
                <Book className="mr-2 h-5 w-5" />
                Cari Buku
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to="/daftar"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Daftar Anggota
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-30">
            {[
              {
                icon: Book,
                title: "Koleksi Lengkap",
                desc: "Ribuan judul buku dari berbagai kategori seperti pertanian, agama, dan teknologi.",
              },
              {
                icon: Clock,
                title: "Jam Operasional",
                desc: "Buka setiap hari kerja untuk melayani kebutuhan literasi Anda.",
              },
              {
                icon: Users,
                title: "Komunitas Pembaca",
                desc: "Bergabung dengan klub buku dan kegiatan literasi rutin.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-secondary hover:transform hover:-translate-y-1 transition duration-300 flex flex-col items-start"
              >
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-dark">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi / About */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full z-0"></div>
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Reading"
                className="rounded-lg shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full z-0"></div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-serif text-primary-dark mb-6">
                Membangun Generasi Cerdas
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Perpustakaan Desa Cingkrong hadir bukan hanya sebagai tempat
                meminjam buku, tetapi sebagai pusat kegiatan masyarakat. Kami
                berkomitmen untuk menyediakan akses informasi yang merata bagi
                seluruh warga desa, mendukung pendidikan, dan melestarikan
                budaya lokal melalui literasi.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary p-4 bg-white shadow-sm rounded-r-lg">
                  <h4 className="font-bold text-lg text-primary-dark mb-1">
                    Visi
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Terwujudnya masyarakat Desa Cingkrong yang gemar membaca,
                    cerdas, berinformasi, dan sejahtera.
                  </p>
                </div>
                <div className="border-l-4 border-primary p-4 bg-white shadow-sm rounded-r-lg">
                  <h4 className="font-bold text-lg text-primary-dark mb-1">
                    Misi
                  </h4>
                  <ul className="text-sm text-text-secondary list-disc list-inside space-y-1">
                    <li>
                      Menyediakan bahan pustaka yang berkualitas dan relevan.
                    </li>
                    <li>
                      Meningkatkan minat baca masyarakat melalui program
                      kreatif.
                    </li>
                    <li>Memfasilitasi kegiatan belajar sepanjang hayat.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Siap Memulai Petualangan Literasi?
          </h2>
          <p className="mb-8 text-primary-light max-w-2xl mx-auto">
            Bergabunglah menjadi anggota sekarang gratis dan nikmati akses ke
            ribuan koleksi buku kami.
          </p>
          <Link
            to="/daftar"
            className="inline-block px-10 py-4 bg-secondary hover:bg-secondary-light text-white font-bold rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Daftar Anggota Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
