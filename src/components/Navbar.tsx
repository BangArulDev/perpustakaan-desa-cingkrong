import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-xl font-serif tracking-wide"
          >
            <BookOpen className="h-8 w-8 text-secondary-light" />
            <span>Desa Cingkrong</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium">
            <Link to="/" className="hover:text-accent transition duration-200">
              Beranda
            </Link>
            <Link
              to="/katalog"
              className="hover:text-accent transition duration-200"
            >
              Katalog Buku
            </Link>
            <Link
              to="/daftar"
              className="hover:text-accent transition duration-200"
            >
              Daftar Anggota
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-dark p-4 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="block py-2 hover:text-secondary-light border-b border-primary-light"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/katalog"
              className="block py-2 hover:text-secondary-light border-b border-primary-light"
              onClick={() => setIsOpen(false)}
            >
              Katalog Buku
            </Link>
            <Link
              to="/daftar"
              className="block py-2 hover:text-secondary-light"
              onClick={() => setIsOpen(false)}
            >
              Daftar Anggota
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
