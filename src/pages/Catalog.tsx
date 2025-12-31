import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { useData } from "../context/DataContext";

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
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-serif text-primary-dark mb-4">
          Katalog Buku Desa
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Temukan koleksi buku menarik untuk menambah wawasan dan pengetahuan
          Anda.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 rounded-lg shadow-md mb-12 gap-6">
        <div className="relative w-full lg:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari judul buku atau penulis..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          <Filter className="text-secondary h-5 w-5 flex-shrink-0" />
          <div className="flex space-x-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-secondary text-white shadow-md"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-surface rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-200 flex flex-col h-full"
          >
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded text-xs font-semibold text-white shadow-sm ${
                    book.stock > 0 ? "bg-primary" : "bg-stone-500"
                  }`}
                >
                  {book.stock > 0 ? "Tersedia" : "Dipinjam"}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs font-bold text-primary tracking-wide uppercase mb-2">
                {book.category}
              </span>
              <h3 className="text-lg font-bold text-text-primary mb-2 leading-snug line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4 flex-grow">
                {book.author}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/book/${book.id}`}
                  className="flex-1 text-center py-2 bg-stone-100 text-stone-700 font-bold rounded shadow-sm hover:bg-stone-200 transition-colors duration-200"
                >
                  Detail
                </Link>
                <button
                  onClick={() => handleBorrow(book.id)}
                  disabled={book.stock <= 0}
                  className={`flex-1 py-2 font-bold rounded shadow-sm transition-colors duration-200 ${
                    book.stock > 0
                      ? "bg-accent text-secondary hover:bg-accent-dark"
                      : "bg-stone-300 text-stone-500 cursor-not-allowed"
                  }`}
                >
                  {book.stock > 0 ? "Pinjam" : "Habis"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-stone-50 rounded-lg border-2 border-dashed border-stone-200">
          <p className="text-xl text-stone-500">Buku tidak ditemukan.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Semua");
            }}
            className="mt-4 text-primary font-semibold hover:underline"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
