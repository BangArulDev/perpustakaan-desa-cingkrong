import { useState } from "react";
import { User, CreditCard, MapPin, Phone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-primary/10 p-6 rounded-full mb-6"
        >
          <CheckCircle className="h-20 w-20 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-bold font-serif text-primary-dark mb-4">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-lg text-text-secondary max-w-lg mb-8">
          Data Anda telah kami terima. Silakan datang ke petugas perpustakaan
          untuk pengambilan kartu anggota fisik dengan membawa KTP.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary font-semibold hover:text-primary-dark underline"
        >
          Kembali ke Form
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-4">
            Daftar Anggota Baru
          </h1>
          <p className="text-text-secondary">
            Isi formulir di bawah ini untuk menjadi anggota Perpustakaan Desa
            Cingkrong.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-8 border-secondary">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary flex items-center">
                <User className="h-4 w-4 mr-2 text-primary" />
                Nama Lengkap
              </label>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-stone-50"
                placeholder="Masukkan nama lengkap sesuai KTP"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-primary" />
                NIK (Nomor Induk Kependudukan)
              </label>
              <input
                required
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-stone-50"
                placeholder="16 digit NIK"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                Nomor WhatsApp
              </label>
              <input
                required
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-stone-50"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                Alamat Lengkap
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-stone-50 resize-none"
                placeholder="Nama Jalan, RT/RW, Dusun..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
              >
                Kirim Pendaftaran
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              Dengan mendaftar, Anda menyetujui tata tertib Perpustakaan Desa
              Cingkrong.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
