import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-dark text-stone-300 py-10 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold font-serif text-white mb-4">
            Perpustakaan Desa Cingkrong
          </h3>
          <p className="text-sm leading-relaxed">
            Membangun masyarakat yang cerdas dan berwawasan luas melalui akses
            literasi yang mudah dan berkualitas.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">Kontak Kami</h4>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary-light mt-1 flex-shrink-0" />
              <span>
                Jl. Raya Purvodadi - Solo KM 5, Desa Cingkrong, Kec. Purvodadi,
                Kab. Grobogan
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary-light flex-shrink-0" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary-light flex-shrink-0" />
              <span>perpus.cingkrong@example.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">Jam Buka</h4>
          <ul className="space-y-2">
            <li className="flex justify-between border-b border-secondary-DEFAULT pb-1">
              <span>Senin - Kamis</span>
              <span className="font-semibold">08:00 - 16:00</span>
            </li>
            <li className="flex justify-between border-b border-secondary-DEFAULT pb-1">
              <span>Jumat</span>
              <span className="font-semibold">08:00 - 11:00</span>
            </li>
            <li className="flex justify-between border-b border-secondary-DEFAULT pb-1">
              <span>Sabtu</span>
              <span className="font-semibold">08:00 - 13:00</span>
            </li>
            <li className="flex justify-between text-secondary-light pt-1">
              <span>Minggu & Hari Libur</span>
              <span>Tutup</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-DEFAULT mt-8 pt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Perpustakaan Desa Cingkrong. Hak
          Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
}
