import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background">
      <Navbar />
      <main className="flex-grow animate-fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
