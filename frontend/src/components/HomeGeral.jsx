import { FaSearch, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import biblioteca from "../assets/biblioteca.jpg";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#eeeeee]">

      <Header />

<section className="relative h-225 w-full overflow-hidden">
  <img
    src={biblioteca}
    alt="Biblioteca"
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-black/40" />

  <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8 lg:px-12">

    <div className="max-w-4xl">

      <h1 className="font-serif text-3xl font-bold uppercase leading-[0.95] text-white md:text-6xl lg:text-6xl">
        DESCUBRA HISTÓRIAS
        <br />
        <span className="text-amber-600">
          EXPANDA MUNDOS
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-amber-100 md:text-xl">
        Sua biblioteca virtual com milhares de
        livros para se inspirar e aprender.
      </p>

      <div className="mt-8 flex h-12 w-full max-w-xl overflow-hidden rounded-md bg-white">

        <div className="flex flex-1 items-center gap-3 px-4">
          <FaSearch className=" text-amber-600" />

          <input
            type="text"
            placeholder="Buscar livros, categorias..."
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>

        <button className="bg-amber-600 px-7 text-sm font-semibold text-white hover:bg-orange-400">
          Buscar
        </button>

      </div>

    </div>
  </div>

</section>

        <section className="mx-auto max-w-7xl px-8 py-10">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="font-serif text-xl font-bold">
              Livros em destaque
            </h2>

            <Link
              to="/pesquisar"
              className="flex items-center gap-1 text-sm text-amber-600 hover:underline"
            >
              Ver Todos
              <FaArrowRight />
            </Link>

          </div>

        </section>

        <section className="px-8 py-14 text-center">

          <h2 className="font-serif text-2xl font-bold text-amber-600">
            Mais de 15 livros
            <br />
            esperando por você
          </h2>

          <p className="mt-4 font-serif text-lg font-bold">
            Pronto para explorar nossa plataforma?
          </p>


          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/cadastro"
              className="rounded-md bg-amber-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-orange-400"
            >
              Criar conta grátis
            </Link>

            <Link
              to="/login"
              className="rounded-md bg-amber-600 px-10 py-3 text-sm font-medium text-white transition hover:bg-orange-400"
            >
              Já tenho conta
            </Link>

          </div>

        </section>
      <Footer />

    </div>
  );
}