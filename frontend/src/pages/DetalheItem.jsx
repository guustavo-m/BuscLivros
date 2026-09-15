import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaHeart, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

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

        const resposta = await fetch(
          `http://localhost:3000/api/livros/${id}`
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

  if (carregando) {
    return (
      <main
        className="min-h-screen bg-[#080808] flex items-center justify-center text-white"
      >
        <p className="text-[#ff8c00]">
          Carregando livro...
        </p>
      </main>
    );
  }

  if (erro || !livro) {
    return (
      <main
        className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-white gap-4"
      >
        <p className="text-red-400">
          {erro || "Livro não encontrado."}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="border border-[#a45d00] px-4 py-2 rounded text-sm hover:bg-[#ff8c00] hover:text-black"
        >
          Voltar
        </button>
      </main>
    );
  }

  return (
    <main
      className=" min-h-screen bg-[#080808] text-white px-5 md:px-10 py-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-300 hover:text-[#ff8c00] mb-6 text-sm"
      >
        <FaArrowLeft />
        Voltar
      </button>

      <div
        className="max-w-[1000px] mx-auto border border-[#8b5200] bg-[#050505] p-5 md:p-7"
      >
        <h1
          className="text-center font-serif font-bold text-2xl md:text-3xl mb-8"
        >
          Detalhes do Livro
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-7"
        >

          <div className="flex flex-col gap-3">

            <Campo
              titulo="Nome"
              valor={livro.nome}
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
              <label className="block text-sm mb-1">
                Nota
              </label>

              <div
                className="h-[30px] border border-[#8b5200] rounded-md px-2 flex items-center gap-2 text-xs text-gray-300"
              >
                <FaStar className="text-[#ff8c00]" />

                {livro.nota} / 5
              </div>
            </div>

          </div>

          <div className="flex justify-center items-start">
            <div className="relative">

              <img
                src={livro.imagem}
                alt={livro.nome}
                className="w-[300px] md:w-[380px] h-[380px] md:h-[430px] object-cover
                "
              />

              <button
                className="absolute top-3 right-3 text-[#ff8c00] text-xl hover:text-white"
              >
                <FaHeart />
              </button>

            </div>
          </div>

          <div className="md:col-span-2">

            <label className="block text-sm mb-1">
              Descrição
            </label>

            <div
              className="border border-[#8b5200] rounded-md p-2 min-h-[60px] text-[10px] leading-3 text-gray-300"
            >
              {livro.descricao}
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}


function Campo({ titulo, valor }) {
  return (
    <div>
      <label className="block text-sm mb-1">
        {titulo}
      </label>

      <div
        className=" h-[30px] border border-[#8b5200] rounded-md px-2 flex items-center text-[10px] text-gray-300"
      >
        {valor || "-"}
      </div>
    </div>
  );
}