import { FaHeart, FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { requisicaoProtegida } from "../services/api";
import { useAuth } from "../context/useAuth";

export default function ItemCard({ livro, onLivroExcluido }) {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const ehAdmin = usuario?.tipo === "admin";

  function abrirDetalhes() {
    navigate(`/livro/${livro.id}`);
  }

  function editarLivro(event) {
    event.stopPropagation();

    navigate(`/editar-livro/${livro.id}`);
  }

  async function excluirLivro(event) {
    event.stopPropagation();

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir "${livro.titulo}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      await requisicaoProtegida(
        `http://localhost:3000/livros/${livro.id}`,
        {
          method: "DELETE",
        }
      );

      if (onLivroExcluido) {
        onLivroExcluido(livro.id);
      }
    } catch (erro) {
      console.error("Erro ao excluir livro:", erro);

      alert(
        erro.message ||
          "Não foi possível excluir o livro."
      );
    }
  }

  return (
    <div
      onClick={abrirDetalhes}
      className="w-full max-w-[275px] cursor-pointer overflow-hidden bg-[#454545] text-white transition duration-300 hover:scale-[1.02]"
    >
      <div className="relative h-[285px] bg-black">
        <img
          src={livro.imagem}
          alt={livro.titulo}
          className="h-full w-full object-cover"
        />

        <div
          className="absolute left-2 top-2 flex h-[34px] w-[34px] flex-col items-center justify-center rounded-md bg-[#ff8c00] text-[11px] text-white"
        >
          <FaStar />

          <span>
            {livro.nota}
          </span>
        </div>

        <button
          type="button"
          onClick={(event) => event.stopPropagation()}
          className="absolute right-2 top-2 text-xl text-[#ff8c00] transition hover:text-white"
          aria-label="Favoritar livro"
        >
          <FaHeart />
        </button>
      </div>

      <div className="p-3">

        <h2
          className="mb-3 min-h-[50px] font-serif text-[20px] font-semibold leading-6"
        >
          {livro.titulo}
        </h2>

        <div
          className="mb-3 flex justify-between gap-2 text-[13px] text-gray-300"
        >
          <span>
            {livro.ano}
          </span>

          <span className="max-w-[120px] truncate">
            {livro.autor}
          </span>

          <span>
            {livro.paginas} pg
          </span>
        </div>

        <p
          className="mb-3 h-[90px] overflow-hidden text-[11px] leading-[12px] text-gray-200"
        >
          <span className="font-semibold">
            Descrição:{" "}
          </span>

          {livro.descricao}
        </p>

        <p className="mb-3 text-[13px]">
          <span className="font-semibold">
            Editora:
          </span>{" "}
          {livro.editora}
        </p>

        <div className="flex items-end justify-between gap-3">
          <span
            className="inline-block rounded border border-[#b56500] px-3 py-1 text-[11px]"
          >
            {livro.categoria}
          </span>

          {ehAdmin && (
            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={editarLivro}
                className="text-base text-[#ff8c00] transition hover:text-white"
                aria-label={`Editar ${livro.titulo}`}
                title="Editar livro"
              >
                <FaEdit />
              </button>

              <button
                type="button"
                onClick={excluirLivro}
                className="text-base text-red-400 transition hover:text-red-300"
                aria-label={`Excluir ${livro.titulo}`}
                title="Excluir livro"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}