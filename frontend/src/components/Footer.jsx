import { FaInstagram, FaTiktok, FaYoutube, FaWhatsapp, FaPhone } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Footer() {
  const { autenticado, fazerLogout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    fazerLogout();
    navigate("/");
  }

  return (
    <footer className="bg-amber-600 text-white">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-8 py-8 md:grid-cols-3">

        <div className="flex items-center gap-3">
          <IoBookOutline className="text-4xl" />

          <span className="font-serif text-xl">
            BUSCLIVROS
          </span>
        </div>

        <div className="flex flex-col gap-3 text-sm">

          <div className="flex items-center gap-2">
            <FaInstagram />
            <span>busc_livros</span>
          </div>

          <div className="flex items-center gap-2">
            <FaTiktok />
            <span>busc_livros_biblioteca</span>
          </div>

          <div className="flex items-center gap-2">
            <FaYoutube />
            <span>canalbusclivros</span>
          </div>

        </div>

        <div className="flex flex-col gap-3 text-sm">

          <p className="font-medium">
            Entre em contato conosco
          </p>

          <div className="flex items-center gap-2">
            <FaWhatsapp />
            <span>19 98925-4587</span>
          </div>

          <div className="flex items-center gap-2">
            <FaPhone />
            <span>3876-1234</span>
          </div>

          {autenticado && (
            <button
              onClick={sair}
              className="mt-2 w-fit rounded-md bg-white px-5 py-2 font-medium text-[#df7916] transition hover:bg-orange-50"
            >
              SAIR
            </button>
          )}

        </div>

      </div>

      <div className="border-t border-orange-300/40 py-4 text-center text-xs">
        © BUSCLIVROS
      </div>

    </footer>
  );
}