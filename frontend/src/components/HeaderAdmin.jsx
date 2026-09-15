import { useState } from "react";
import { IoBookOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Header() {
  const { fazerLogout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  function sair() {
    fazerLogout();
    setMenuAberto(false);
    navigate("/");
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="bg-amber-600 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-6">
          <Link
            to="/"
            onClick={fecharMenu}
            className="flex items-center gap-3"
          >
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

            <Link
              to="/administrador"
              className="rounded-md bg-white px-5 py-2 font-medium text-[#df7916] transition hover:bg-orange-50"
            >
              PAINEL
            </Link>

            <button
              onClick={sair}
              className="rounded-md bg-white px-5 py-2 font-medium text-[#df7916] transition hover:bg-orange-50"
            >
              SAIR
            </button>
          </nav>

          <button
            type="button"
            onClick={() =>
              setMenuAberto(!menuAberto)
            }
            className="flex items-center justify-center text-2xl md:hidden"
            aria-label={
              menuAberto
                ? "Fechar menu"
                : "Abrir menu"
            }
            aria-expanded={menuAberto}
          >
            {menuAberto ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>

        {menuAberto && (
          <nav className="border-t border-orange-400/50 bg-amber-700 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={fecharMenu}
                className="rounded-md px-4 py-3 text-sm font-medium transition hover:bg-orange-500"
              >
                Início
              </Link>

              <Link
                to="/pesquisar"
                onClick={fecharMenu}
                className="rounded-md px-4 py-3 text-sm font-medium transition hover:bg-orange-500"
              >
                Livros
              </Link>

              <Link
                to="/cadastro"
                onClick={fecharMenu}
                className="rounded-md px-4 py-3 text-sm font-medium transition hover:bg-orange-500"
              >
                Cadastre-se
              </Link>

              <Link
                to="/administrador"
                onClick={fecharMenu}
                className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-[#df7916] transition hover:bg-orange-50"
              >
                PAINEL
              </Link>

              <button
                type="button"
                onClick={sair}
                className="rounded-md bg-white px-4 py-3 text-left text-sm font-semibold text-[#df7916] transition hover:bg-orange-50"
              >
                SAIR
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}