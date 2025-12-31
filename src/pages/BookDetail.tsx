import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Book as BookIcon, User, Layers, Box } from "lucide-react";
import { useData } from "../context/DataContext";
import { useEffect, useState } from "react";
import { Book } from "../context/DataContext";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, borrowBook } = useData();
  const [book, setBook] = useState<Book | null>(null);

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
      navigate("/profile"); // Redirect to profile to see the loan
    }
  };

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

  if (!book) return null;

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-text-secondary hover:text-primary mb-8 transition"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Kembali
      </button>

      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Cover Section */}
          <div className="md:w-1/3 lg:w-1/4 bg-stone-100 p-8 flex items-center justify-center">
            <div className="relative shadow-2xl rounded-lg overflow-hidden w-64 md:w-full max-w-[300px] aspect-[2/3]">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md ${
                    book.stock > 0 ? "bg-primary" : "bg-stone-500"
                  }`}
                >
                  {book.stock > 0 ? "Tersedia" : "Stok Habis"}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 lg:w-3/4 p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <span className="inline-block bg-accent/20 text-accent-dark px-3 py-1 rounded text-xs font-bold tracking-wider uppercase mb-3">
                {book.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-dark font-serif mb-2 leading-tight">
                {book.title}
              </h1>
              <div className="flex items-center text-text-secondary text-lg">
                <User className="h-5 w-5 mr-2" />
                <span>{book.author}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-stone-50 p-6 rounded-xl border border-stone-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <BookIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">
                    Kategori
                  </p>
                  <p className="font-bold text-primary-dark">{book.category}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <Box className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary font-medium">
                    Stok Buku
                  </p>
                  <p className="font-bold text-primary-dark">
                    {book.stock} Exemplar
                  </p>
                </div>

                <div className="flex gap-4 mb-8">
                  <button
                    onClick={handleBorrow}
                    disabled={book.stock <= 0}
                    className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-transform transform hover:-translate-y-1 ${
                      book.stock > 0
                        ? "bg-accent text-secondary hover:bg-accent-dark"
                        : "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none hover:translate-y-0"
                    }`}
                  >
                    {book.stock > 0 ? "Pinjam Buku Ini" : "Stok Habis"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-primary-dark mb-3">
                Sinopsis
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>

            {book.stock <= 0 && (
              <div className="mt-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-start">
                <div className="mr-3 mt-0.5">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">
                    Buku Sedang Tidak Tersedia
                  </p>
                  <p className="text-sm opacity-90">
                    Maaf, saat ini stok buku ini sedang kosong atau dipinjam
                    semua. Silakan cek kembali nanti.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
