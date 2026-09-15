import React, { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import ItemCard from "../components/ItemCard";

export default function PesquisarLivros() {
  const [livros, setLivros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const categorias = [
    "Todos",
    "Romance",
    "Sci-Fi",
    "Ação",
    "Aventura",
    "Terror",
  ];


useEffect(() => {
  async function buscarLivro() {
    try {
      setCarregando(true);
      setErro("");

      const token = localStorage.getItem("jwtToken");

      const resposta = await fetch(
        `http://localhost:3000/livros/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!resposta.ok) {
        throw new Error("Livro não encontrado.");
      }

      const dados = await resposta.json();

      setLivro(dados);

    } catch (error) {
      console.error(error);
      setErro("Não foi possível carregar o livro.");
    } finally {
      setCarregando(false);
    }
  }

  buscarLivro();
}, [id]);

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

  return (
    <main className="min-h-screen bg-[#080808] text-white px-5 py-8">

      <div className="flex justify-center mb-8">
        <div className="relative w-[235px]">

          <input
            type="text"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Pesquisar livros..."
            className="w-full h-[22px] bg-transparent border border-[#a45d00] rounded-[4px] px-2 pr-7 text-[11px] text-white placeholder-gray-400 outline-none focus:border-[#ff8c00]"
          />

          <FaSearch
            className=" absolute right-2 top-1/2 -translate-y-1/2 text-[#ff8c00] text-[10px]"
          />

        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 mb-7 justify-center md:justify-start"
      >

        {categorias.map((item) => (
          <button
            key={item}
            onClick={() => setCategoria(item)}
            className={`h-[21px] min-w-[80px] px-3 rounded-[5px] border border-[#a45d00] font-serif text-[11px] transition duration-200

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

      {carregando && (
        <div
          className="flex flex-col items-center justify-center py-20 gap-3"
        >
          <FaSpinner
        className="animate-spin text-[#ff8c00] text-2xl"
/>         

          <p className="text-sm text-gray-400">
            Carregando livros...
          </p>
        </div>
      )}

      {/* ERRO */}
      {!carregando && erro && (
        <div className="text-center py-20">
          <p className="text-red-400">
            {erro}
          </p>
        </div>
      )}

      {/* LIVROS */}
      {!carregando && !erro && (
        <>
          {livrosFiltrados.length > 0 ? (

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center"
            >

              {livrosFiltrados.map((livro) => (
                <ItemCard
                  key={livro.id}
                  livro={livro}
                />
              ))}

            </div>

          ) : (

            <div className="text-center py-20">
              <p className="text-gray-400 font-serif">
                Nenhum livro encontrado.
              </p>
            </div>

          )}
        </>
      )}

    </main>
  );
}