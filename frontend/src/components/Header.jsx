import { IoBookOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Header() {
  const { autenticado, fazerLogout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    fazerLogout();
    navigate("/");
  }

  return (
    <header className="bg-amber-600 text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link to="/" className="flex items-center gap-3">
          <IoBookOutline className="text-4xl" />

          <span className="font-serif text-xl tracking-wide">
            BUSCLIVROS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm md:flex">

          <Link
            to="/"
            className="transition hover:text-orange-100"
          >
            Início
          </Link>

          <Link
            to="/pesquisar"
            className="transition hover:text-orange-100"
          >
            Livros
          </Link>

          <Link
            to="/cadastro"
            className="transition hover:text-orange-100"
          >
            Cadastre-se
          </Link>

          {autenticado ? (
            <button
              onClick={sair}
              className="rounded-md bg-white px-5 py-2 font-medium text-[#df7916] transition hover:bg-orange-50"
            >
              SAIR
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-white px-5 py-2 font-medium text-[#df7916] transition hover:bg-orange-50"
            >
              ENTRAR
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
}