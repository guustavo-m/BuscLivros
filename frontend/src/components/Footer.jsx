import { FaInstagram, FaTiktok, FaYoutube,FaWhatsapp, FaPhone } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

export default function Footer() {
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

        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-orange-300/40 py-4 text-center text-xs">
        © BUSCLIVROS
      </div>

    </footer>
  );
}