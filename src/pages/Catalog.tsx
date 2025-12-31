import { useState } from "react";
import { Search, Filter } from "lucide-react";

const MOCK_BOOKS = [
  {
    id: 1,
    title: "Teknologi Tepat Guna Pertanian",
    author: "Dr. Ir. Suharso",
    category: "Pertanian",
    cover:
      "https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: 2,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    cover:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    available: false,
  },
  {
    id: 3,
    title: "Panduan Belajar Coding untuk Pemula",
    author: "John Doe",
    category: "Teknologi",
    cover:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: 4,
    title: "Sejarah Islam di Jawa",
    author: "Prof. Hasan",
    category: "Agama",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: 5,
    title: "Budidaya Lele Sangkuriang",
    author: "Tim Agromedia",
    category: "Pertanian",
    cover:
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: 6,
    title: "Dongeng Kancil dan Buaya",
    author: "Cerita Rakyat",
    category: "Anak",
    cover:
      "https://images.unsplash.com/photo-1519682337058-a5ca054c481e?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: 7,
    title: "Resep Masakan Nusantara",
    author: "Chef Juna",
    category: "Umum",
    cover:
      "https://images.unsplash.com/photo-1495521841654-92427f411bd1?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: 8,
    title: "Ensiklopedi Sains",
    author: "National Geographic",
    category: "Pendidikan",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
];

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredBooks = MOCK_BOOKS.filter((book) => {
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
                    book.available ? "bg-primary" : "bg-stone-500"
                  }`}
                >
                  {book.available ? "Tersedia" : "Dipinjam"}
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
              <button className="w-full py-2.5 bg-accent text-secondary font-bold rounded shadow-sm hover:bg-accent-dark transition-colors duration-200">
                Lihat Detail
              </button>
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
