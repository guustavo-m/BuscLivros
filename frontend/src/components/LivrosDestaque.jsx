import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";

const API_URL = "http://localhost:3000";

export default function LivrosDestaque() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resposta = await fetch(`${API_URL}/livros`);

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(
            dados.mensagem || "Erro ao carregar os livros."
          );
        }

        setLivros(dados.slice(0, 4));
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarLivros();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-8 py-10">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="font-serif text-xl font-bold text-black">
          Livros em destaque
        </h2>

        <Link
          to="/pesquisar"
          className="flex items-center gap-1 text-sm text-amber-600 transition hover:underline"
        >
          Ver Todos
          <FaArrowRight />
        </Link>

      </div>

      {carregando && (
        <div className="py-10 text-center text-gray-500">
          Carregando livros...
        </div>
      )}

      {!carregando && erro && (
        <div className="py-10 text-center text-red-500">
          {erro}
        </div>
      )}

      {!carregando && !erro && livros.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          Nenhum livro encontrado.
        </div>
      )}

      {!carregando && !erro && livros.length > 0 && (
        <div className="flex flex-wrap justify-center gap-6">

          {livros.map((livro) => (
            <ItemCard
              key={livro.id}
              livro={livro}
            />
          ))}

        </div>
      )}

    </section>
  );
}