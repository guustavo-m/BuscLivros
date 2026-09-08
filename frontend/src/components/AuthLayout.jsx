import { Link } from "react-router-dom";
import machado from "../assets/machado.jpg";
import { FaArrowLeft } from "react-icons/fa";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="relative h-[330px] w-full shrink-0 overflow-hidden lg:h-screen lg:w-[40%]">

          <img src={machado} alt="Machado de Assis" className="absolute inset-0 h-full w-full object-cover object-[center_20%]"/>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>
          <div className="absolute bottom-6 left-5 right-5 lg:bottom-10 lg:left-10 lg:right-10">

            <p className=" max-w-xl font-serif text-lg leading-tight text-white sm:text-xl lg:text-2xl">
              "Esquecer é uma necessidade. A vida é uma lousa, em que o destino, para escrever um novo caso, precisa de apagar o caso escrito"
            </p>

            <p className="mt-3 font-serif text-xs text-white/80 lg:text-sm">
              — Verba Testamentária, Machado de Assis
            </p>
          </div>
        </section>

        <section className="flex min-h-[calc(100vh-330px)] flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:min-h-screen lg:px-16">
          <div className="w-full max-w-xl">

            <Link to="/" className="inline-flex items-center gap-2 text-xs text-white/70 transition hover:text-[#ff7800]">
                <FaArrowLeft />
                Voltar ao início
            </Link>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}