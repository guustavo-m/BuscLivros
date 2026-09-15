import { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function DetalheItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarLivro() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(
          `http://localhost:3000/livros/${id}`
        );

        if (!resposta.ok) {
          throw new Error(
            "Livro não encontrado."
          );
        }

        const dados =
          await resposta.json();

        setLivro(dados);

      } catch (error) {
        console.error(error);

        setErro(
          "Não foi possível carregar o livro."
        );

      } finally {
        setCarregando(false);
      }
    }

    buscarLivro();
  }, [id]);

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <p className="text-base text-[#ff8c00]">
          Carregando livro...
        </p>
      </main>
    );
  }

  if (erro || !livro) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#080808] text-white">
        <p className="text-base text-red-400">
          {erro || "Livro não encontrado."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="rounded border border-[#a45d00] px-5 py-2 text-sm transition hover:bg-[#ff8c00] hover:text-black"
        >
          Voltar
        </button>

      </main>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen bg-[#080808] px-5 py-10 text-white md:px-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-base text-gray-300 transition hover:text-[#ff8c00]"
        >
          <FaArrowLeft />
          Voltar
        </button>
        <div className="mx-auto max-w-[1000px] border border-[#8b5200] bg-[#050505] p-6 md:p-8">
          <h1 className="mb-9 text-center font-serif text-3xl font-bold md:text-4xl">
            Detalhes do Livro
          </h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">

              <Campo
                titulo="Nome"
                valor={livro.titulo}
              />

              <Campo
                titulo="Ano de Lançamento"
                valor={livro.ano}
              />

              <Campo
                titulo="Autor"
                valor={livro.autor}
              />

              <Campo
                titulo="Páginas"
                valor={livro.paginas}
              />

              <Campo
                titulo="Categoria"
                valor={livro.categoria}
              />

              <Campo
                titulo="Editora"
                valor={livro.editora}
              />

              <div>
                <label className="mb-2 block text-base font-medium">
                  Nota
                </label>
                <div className="flex h-[40px] items-center gap-2 rounded-md border border-[#8b5200] px-3 text-sm text-gray-300">
                  <FaStar className="text-[#ff8c00]" />
                  {livro.nota} / 10
                </div>
              </div>
            </div>

            <div className="flex items-start justify-center">
              <div className="relative">
                <img
                  src={livro.imagem}
                  alt={livro.titulo}
                  className="h-[380px] w-[300px] object-cover md:h-[430px] md:w-[380px]"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3 text-2xl text-[#ff8c00] transition hover:text-white"
                  aria-label="Favoritar livro"
                >
                  <FaHeart />
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-base font-medium">
                Descrição
              </label>
              <div className="min-h-[100px] rounded-md border border-[#8b5200] p-4 text-sm leading-6 text-gray-300">
                {livro.descricao}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function Campo({ titulo, valor }) {
  return (
    <div>
      <label className="mb-2 block text-base font-medium">
        {titulo}
      </label>
      <div className="flex min-h-[40px] items-center rounded-md border border-[#8b5200] px-3 text-sm text-gray-300">
        {valor || "-"}
      </div>
    </div>
  );
}