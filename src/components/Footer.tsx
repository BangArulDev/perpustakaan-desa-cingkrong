import { MapPin, Phone, Mail, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Cingkrong<span className="text-primary font-black uppercase text-[10px] ml-1 tracking-widest">Lib</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Membangun masyarakat yang cerdas dan berwawasan luas melalui akses
              literasi digital yang inklusif dan berkualitas tinggi untuk seluruh warga desa.
            </p>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Informasi Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-600 leading-snug font-medium">
                  Jl. Raya Purwodadi - Solo KM 5, Desa Cingkrong, Kec. Purwodadi, Grobogan
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-slate-600 font-medium">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-slate-600 font-medium">perpus.cingkrong@mail.id</span>
              </li>
            </ul>
          </div>

          {/* Hours Section - Perbaikan Nama Hari Lengkap */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Waktu Layanan</h4>
            <ul className="space-y-3">
              {[
                { hari: "Senin", jam: "08:00 — 16:00" },
                { hari: "Selasa", jam: "08:00 — 16:00" },
                { hari: "Rabu", jam: "08:00 — 16:00" },
                { hari: "Kamis", jam: "08:00 — 16:00" },
                { hari: "Jumat", jam: "08:00 — 11:00" },
                { hari: "Sabtu", jam: "08:00 — 13:00" },
              ].map((item) => (
                <li key={item.hari} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                  <span className="text-slate-500 font-medium">{item.hari}</span>
                  <span className="text-slate-800 font-bold tracking-tight">{item.jam}</span>
                </li>
              ))}
              <li className="flex justify-between items-center text-sm pt-1">
                <span className="text-slate-400 font-medium italic">Minggu</span>
                <span className="text-accent font-black text-[10px] uppercase tracking-widest">Tutup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-50 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Cingkrong Digital Library
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}