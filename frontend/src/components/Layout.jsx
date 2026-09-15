import { useAuth } from "../context/useAuth";
import HeaderAdmin from "./HeaderAdmin";
import HeaderComum from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { usuario } = useAuth();
  const ehAdmin = usuario?.tipo === "admin";

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">

      {ehAdmin ? <HeaderAdmin /> : <HeaderComum />}

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}