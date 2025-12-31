import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";

// Types
export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  stock: number;
  cover?: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "blocked";
  joinDate: string;
  password?: string; // For mock auth
}

export interface Loan {
  id: number;
  bookId: number;
  memberId: any; // Changed to allow UUID string from Supabase
  loanDate: string;
  dueDate: string;
  status: "borrowed" | "returned" | "overdue";
}

interface DataContextType {
  books: Book[];
  members: Member[];
  loans: Loan[];
  addBook: (book: Omit<Book, "id">) => void;
  deleteBook: (id: number) => void;
  updateMemberStatus: (id: number, status: Member["status"]) => void;
  registerMember: (
    member: Omit<Member, "id" | "role" | "status" | "joinDate">
  ) => void;
  borrowBook: (bookId: number, memberId: any) => void;
  returnBook: (loanId: number, bookId: number) => void;
}

// Initial Data replaced by Supabase

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: booksData, error: booksError } = await supabase
        .from("books")
        .select("*")
        .order("id", { ascending: true });

      console.log("DEBUG: Fetch Books Result:", { booksData, booksError });

      if (booksError) {
        console.error("DEBUG: Error fetching books:", booksError);
      }

      if (booksData) {
        console.log(`DEBUG: Found ${booksData.length} books.`);
        setBooks(booksData);
      } else {
        console.warn(
          "DEBUG: No books data found (might be empty array or RLS)."
        );
      }

      const { data: profilesData } = await supabase
        .from("profiles")
        .select("*");
      if (profilesData) {
        setMembers(
          profilesData.map(
            (p) =>
              ({
                id: p.id,
                name: p.name,
                email: p.email || "",
                role: p.role || "member",
                status: p.status || "active",
                joinDate: p.join_date || "",
                password: p.password || "user123",
              } as any)
          )
        );
        // We should ideally update Member type to string | number.
      }

      const { data: loansData } = await supabase.from("loans").select("*");
      if (loansData) {
        setLoans(
          loansData.map((l) => ({
            id: l.id,
            bookId: l.book_id,
            memberId: l.member_id,
            loanDate: l.loan_date,
            dueDate: l.due_date,
            status: l.status as any,
          }))
        );
      }
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const sub = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "books" },
        () => fetchData()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loans" },
        () => fetchData()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => fetchData()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(sub);
    };
  }, []);

  const addBook = async (newBook: Omit<Book, "id">) => {
    await supabase.from("books").insert([newBook]);
    fetchData();
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const updateMemberStatus = (id: number, status: Member["status"]) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const registerMember = async (
    newMemberData: Omit<Member, "id" | "role" | "status" | "joinDate">
  ) => {
    console.log("=== REGISTER REQUEST ===", newMemberData);
    try {
      // 1. Sign Up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newMemberData.email,
        password: newMemberData.password || "user123",
      });

      console.log("Supabase Auth Result:", { authData, authError });

      if (authError) {
        console.error("Auth Failed:", authError.message);
        throw authError; // Throw so UI catches it
      }

      if (authData.user) {
        console.log("User created! ID:", authData.user.id);

        // 2. Create Profile Record
        const newProfile = {
          id: authData.user.id,
          name: newMemberData.name,
          email: newMemberData.email,
          password: newMemberData.password, // Added password here
          role: "member",
          status: "active",
          join_date: new Date().toISOString().split("T")[0],
        };

        console.log("Inserting Profile:", newProfile);

        const { error: profileError } = await supabase
          .from("profiles")
          .insert([newProfile]);

        if (profileError) {
          console.error("Profile Insert Failed:", profileError);
          throw profileError;
        }

        console.log("Profile Inserted Successfully");
        fetchData();
        alert("Registrasi berhasil! Silakan login.");
      } else {
        console.warn("No User returned. Email confirmation required?");
        alert(
          "Registrasi berhasil, tetapi user belum aktif. Cek email konfirmasi Anda."
        );
      }
    } catch (error: any) {
      console.error("Registration Exception:", error);
      alert("Gagal registrasi: " + error.message);
      throw error;
    }
  };

  const borrowBook = async (bookId: number, memberId: any) => {
    try {
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(dueDate.getDate() + 7); // 7 days loan duration

      const newLoan = {
        book_id: bookId,
        member_id: memberId,
        loan_date: today.toISOString().split("T")[0],
        due_date: dueDate.toISOString().split("T")[0],
        status: "borrowed",
      };

      console.log("DEBUG: Borrowing Book...", newLoan);

      // 1. Insert Loan
      const { error: loanError } = await supabase
        .from("loans")
        .insert([newLoan]);
      if (loanError) throw loanError;

      // 2. Decrement Book Stock
      const bookToUpdate = books.find((b) => b.id === bookId);
      if (bookToUpdate && bookToUpdate.stock > 0) {
        const { error: stockError } = await supabase
          .from("books")
          .update({ stock: bookToUpdate.stock - 1 })
          .eq("id", bookId);
        if (stockError) console.error("Failed to update stock:", stockError);
      }

      console.log("Borrow success!");
      fetchData();
      alert("Peminjaman berhasil dicatat!");
    } catch (err: any) {
      console.error("Borrow Error:", err);
    }
  };

  const returnBook = async (loanId: number, bookId: number) => {
    try {
      console.log("DEBUG: Returning Book...", { loanId, bookId });

      // 1. Update Loan Status
      const { error: loanError } = await supabase
        .from("loans")
        .update({ status: "returned" })
        .eq("id", loanId);

      if (loanError) throw loanError;

      // 2. Increment Book Stock
      const bookToUpdate = books.find((b) => b.id === bookId);
      if (bookToUpdate) {
        const { error: stockError } = await supabase
          .from("books")
          .update({ stock: bookToUpdate.stock + 1 })
          .eq("id", bookId);

        if (stockError) console.error("Failed to update stock:", stockError);
      }

      console.log("Return success!");
      fetchData();
      alert("Buku berhasil dikembalikan!");
    } catch (err: any) {
      console.error("Return Error:", err);
      alert("Gagal mengembalikan buku: " + err.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        books,
        members,
        loans,
        addBook,
        deleteBook,
        updateMemberStatus,
        registerMember,
        borrowBook,
        returnBook,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
