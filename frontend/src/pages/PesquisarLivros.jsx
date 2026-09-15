import { useEffect, useState } from "react";
import { FaSearch, FaSpinner, FaPlus, } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import Layout from "../components/Layout";
import { useAuth } from "../context/useAuth";

export default function PesquisarLivros() {
  const [livros, setLivros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [carregando, setCarregando] = useState(true);
  const [carregandoCategorias, setCarregandoCategorias] = useState(true);
  const [erro, setErro] = useState("");
  const [erroCategorias, setErroCategorias] = useState("");
  const { usuario } = useAuth();

  useEffect(() => {
    async function buscarLivros() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(
          "http://localhost:3000/livros"
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar os livros");
        }

        const dados = await resposta.json();

        setLivros(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os livros.");
      } finally {
        setCarregando(false);
      }
    }

    buscarLivros();
  }, []);

  useEffect(() => {
    async function buscarCategorias() {
      try {
        setCarregandoCategorias(true);
        setErroCategorias("");

        const resposta = await fetch(
          "http://localhost:3000/livros/categorias"
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar as categorias");
        }

        const dados = await resposta.json();

        setCategorias(dados);
      } catch (error) {
        console.error(error);
        setErroCategorias(
          "Não foi possível carregar as categorias."
        );
      } finally {
        setCarregandoCategorias(false);
      }
    }

    buscarCategorias();
  }, []);

  const livrosFiltrados = livros.filter((livro) => {
    const texto = pesquisa.toLowerCase().trim();

    const correspondePesquisa =
      livro.titulo?.toLowerCase().includes(texto) ||
      livro.autor?.toLowerCase().includes(texto);

    const correspondeCategoria =
      categoria === "Todos" ||
      livro.categoria?.toLowerCase() === categoria.toLowerCase();

    return correspondePesquisa && correspondeCategoria;
  });

  const ehAdmin = usuario?.tipo === "admin";

  return (
    <Layout>
      <main className="min-h-screen bg-[#080808] px-5 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <section className="mb-12">
            <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-serif text-3xl font-bold md:text-4xl">
                  Explorar livros
                </h1>
                <p className="mt-2 text-base text-gray-400 md:text-lg">
                  Encontre seu próximo livro favorito.
                </p>
              </div>

              {ehAdmin && (
                <Link
                  to="/cadastro-livro"
                  className="flex w-fit items-center gap-2 rounded-md bg-[#ff8c00] px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
                >
                  <FaPlus />
                  Adicionar livros
                </Link>
              )}
            </div>

            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                placeholder="Pesquisar por título ou autor..."
                className="h-14 w-full rounded-lg border border-[#a45d00] bg-[#111111] px-5 pr-14 text-base text-white outline-none transition focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]"
              />
              <FaSearch
                className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-[#ff8c00]"
              />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="mb-4 font-serif text-lg font-bold text-white">
              Categorias
            </h2>
            {carregandoCategorias && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaSpinner className="animate-spin text-[#ff8c00]" />
                Carregando categorias...
              </div>
            )}
            {!carregandoCategorias && erroCategorias && (
              <p className="text-sm text-red-400">
                {erroCategorias}
              </p>
            )}
            {!carregandoCategorias && !erroCategorias && (
              <div className="flex flex-wrap gap-3">

                <button
                  onClick={() => setCategoria("Todos")}
                  className={`
                    min-h-[38px]
                    rounded-md
                    border
                    border-[#a45d00]
                    px-5
                    py-2
                    font-serif
                    text-sm
                    transition
                    duration-200

                    ${
                      categoria === "Todos"
                        ? "bg-[#ff8c00] text-black"
                        : "bg-transparent text-white hover:bg-[#ff8c00] hover:text-black"
                    }
                  `}
                >
                  Todos
                </button>

                {categorias.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategoria(item)}
                    className={`
                      min-h-[38px]
                      rounded-md
                      border
                      border-[#a45d00]
                      px-5
                      py-2
                      font-serif
                      text-sm
                      transition
                      duration-200

                      ${
                        categoria === item
                          ? "bg-[#ff8c00] text-black"
                          : "bg-transparent text-white hover:bg-[#ff8c00] hover:text-black"
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold md:text-2xl">
                Livros
              </h2>
              {!carregando && !erro && (
                <span className="text-sm text-gray-400">
                  {livrosFiltrados.length}{" "}
                  {livrosFiltrados.length === 1
                    ? "livro encontrado"
                    : "livros encontrados"}
                </span>
              )}
            </div>

            {carregando && (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <FaSpinner className="animate-spin text-3xl text-[#ff8c00]" />
                <p className="text-base text-gray-400">
                  Carregando livros...
                </p>
              </div>
            )}

            {!carregando && erro && (
              <div className="py-20 text-center">
                <p className="text-base text-red-400">
                  {erro}
                </p>
              </div>
            )}

            {!carregando && !erro && (
              <>
                {livrosFiltrados.length > 0 ? (

                  <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:justify-items-start">

                    {livrosFiltrados.map((livro) => (
                      <ItemCard
                        key={livro.id}
                        livro={livro}
                      />
                    ))}

                  </div>

                ) : (

                  <div className="py-20 text-center">

                    <p className="font-serif text-base text-gray-400">
                      Nenhum livro encontrado.
                    </p>

                  </div>

                )}

              </>
            )}

          </section>

        </div>
      </main>
    </Layout>
  );
}