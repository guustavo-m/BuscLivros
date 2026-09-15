import { useEffect, useState } from "react";
import { z } from "zod";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { requisicaoProtegida } from "../services/api";
import Layout from "../components/Layout";

const livroSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "Informe o título do livro."),

  autor: z
    .string()
    .trim()
    .min(1, "Informe o autor."),

  categoria: z
    .string()
    .trim()
    .min(1, "Informe a categoria."),

  editora: z
    .string()
    .trim()
    .min(1, "Informe a editora."),

  ano: z.preprocess(
    (valor) => (
      valor === "" ? undefined : Number(valor)
    ),
    z
      .number({
        invalid_type_error: "Informe um ano válido.",
      })
      .int()
      .min(1000, "Informe um ano válido.")
  ),

  paginas: z.preprocess(
    (valor) => (
      valor === "" ? undefined : Number(valor)
    ),
    z
      .number({
        invalid_type_error:
          "Informe um número de páginas válido.",
      })
      .int()
      .positive(
        "Informe um número de páginas válido."
      )
  ),

  nota: z.preprocess(
    (valor) => (
      valor === "" ? undefined : Number(valor)
    ),
    z
      .number({
        invalid_type_error: "Informe uma nota válida.",
      })
      .min(0, "A nota mínima é 0.")
      .max(10, "A nota máxima é 10.")
  ),

  imagem: z
    .string()
    .min(1, "Escolha uma imagem para a capa."),

  descricao: z
    .string()
    .trim()
    .min(1, "Informe a sinopse do livro."),
});

const formularioVazio = {
  titulo: "",
  autor: "",
  categoria: "",
  editora: "",
  ano: "",
  paginas: "",
  nota: "",
  imagem: "",
  descricao: "",
};

const estiloInput = "mt-1 w-full rounded-md border border-orange-500 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400";

export default function CadastroLivros() {
  const navigate = useNavigate();
  const { id } = useParams();
  const modoEdicao = Boolean(id);
  const [livro, setLivro] = useState(
    formularioVazio
  );
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [carregandoLivro, setCarregandoLivro] = useState(modoEdicao);

  useEffect(() => {
    if (!modoEdicao) {
      return;
    }

    async function buscarLivro() {
      try {
        setCarregandoLivro(true);
        setMensagem("");

        const resposta = await fetch(
          `http://localhost:3000/livros/${id}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(
            dados.mensagem ||
              "Erro ao carregar o livro."
          );
        }

        setLivro({
          titulo: dados.titulo ?? "",
          autor: dados.autor ?? "",
          categoria: dados.categoria ?? "",
          editora: dados.editora ?? "",
          ano: dados.ano ?? "",
          paginas: dados.paginas ?? "",
          nota: dados.nota ?? "",
          imagem: dados.imagem ?? "",
          descricao: dados.descricao ?? "",
        });

      } catch (erro) {
        console.error(
          "Erro ao carregar livro:",
          erro
        );

        setMensagem(
          erro.message ||
            "Não foi possível carregar o livro."
        );

      } finally {
        setCarregandoLivro(false);
      }
    }

    buscarLivro();
  }, [id, modoEdicao]);

  function voltar() {
    navigate("/pesquisar");
  }

  function mudarCampo(event) {
    const { name, value } = event.target;

    setLivro((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErros((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMensagem("");
  }

  function escolherImagem(event) {
    const arquivo =
      event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setLivro((prev) => ({
        ...prev,
        imagem: leitor.result,
      }));

      setErros((prev) => ({
        ...prev,
        imagem: "",
      }));

      setMensagem("");
    };

    leitor.readAsDataURL(arquivo);
  }

  async function enviarFormulario(event) {
    event.preventDefault();

    setMensagem("");

    const resultado =
      livroSchema.safeParse(livro);

    if (!resultado.success) {
      const novosErros = {};

      resultado.error.issues.forEach(
        (erro) => {
          const campo = erro.path[0];

          novosErros[campo] =
            erro.message;
        }
      );
      setErros(novosErros);
      return;
    }

    setErros({});
    setEnviando(true);

    try {
      const url = modoEdicao
        ? `http://localhost:3000/livros/${id}`
        : "http://localhost:3000/livros";

      const metodo = modoEdicao
        ? "PUT"
        : "POST";

      await requisicaoProtegida(url, {
        method: metodo,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(
          resultado.data
        ),
      });

      if (!modoEdicao) {
        setLivro(formularioVazio);

        setMensagem(
          "Livro cadastrado com sucesso!"
        );

        return;
      }

      setMensagem(
        "Livro atualizado com sucesso!"
      );

      setTimeout(() => {
        navigate("/pesquisar");
      }, 700);

    } catch (erro) {
      console.error(
        "Erro ao salvar livro:",
        erro
      );

      setMensagem(
        erro.message ||
          (
            modoEdicao
              ? "Erro ao atualizar o livro."
              : "Erro ao cadastrar o livro."
          )
      );

    } finally {
      setEnviando(false);
    }
  }

  if (carregandoLivro) {
    return (
      <Layout>
        <main className="min-h-screen bg-black px-4 py-8 text-white">
          <section className="mx-auto max-w-5xl rounded-xl border border-orange-500 bg-zinc-950 p-6">
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-sm text-zinc-400">
                Carregando informações do livro...
              </p>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="min-h-screen bg-black px-4 py-8 text-white">
        <section className="mx-auto max-w-5xl rounded-xl border border-orange-500 bg-zinc-950 p-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {modoEdicao
                  ? "Editar Livro"
                  : "Cadastrar Livro"}
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                {modoEdicao
                  ? "Altere as informações do livro."
                  : "Preencha as informações do livro."}
              </p>
            </div>

            <button
              type="button"
              onClick={voltar}
              className="flex w-fit items-center gap-2 rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-400 transition hover:bg-orange-500 hover:text-black"
            >
              <FaArrowLeft />
              Voltar
            </button>
          </div>

          <form
            onSubmit={enviarFormulario}
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <div>

                <label className="text-sm font-semibold">
                  Imagem da capa
                </label>

                <div className="mt-2 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-orange-500 bg-zinc-900 p-4">
                  {livro.imagem ? (
                    <img
                      src={livro.imagem}
                      alt="Capa do livro"
                      className="mb-4 h-44 w-32 rounded object-cover"
                    />
                  ) : (
                    <div className="mb-4 flex h-44 w-32 items-center justify-center bg-zinc-800 text-center text-xs text-zinc-500">
                      Sem imagem
                    </div>
                  )}

                  <label className="cursor-pointer rounded border border-zinc-500 px-3 py-2 text-xs hover:border-orange-400">
                    {modoEdicao
                      ? "Alterar imagem"
                      : "Escolher imagem"}

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={escolherImagem}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="mt-2 text-xs text-zinc-500">
                  JPG, PNG ou WEBP.
                </p>

                <p className="mt-1 min-h-4 text-xs text-orange-400">
                  {erros.imagem}
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">
                    Título
                  </label>
                  <input
                    name="titulo"
                    value={livro.titulo}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />
                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.titulo}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Autor
                  </label>
                  <input
                    name="autor"
                    value={livro.autor}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />
                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.autor}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Categoria
                  </label>
                  <input
                    name="categoria"
                    value={livro.categoria}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />
                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.categoria}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Editora
                  </label>

                  <input
                    name="editora"
                    value={livro.editora}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />
                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.editora}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Ano de publicação
                  </label>
                  <input
                    type="number"
                    name="ano"
                    value={livro.ano}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />
                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.ano}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Número de páginas
                  </label>

                  <input
                    type="number"
                    name="paginas"
                    value={livro.paginas}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />

                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.paginas}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Nota
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    name="nota"
                    value={livro.nota}
                    onChange={mudarCampo}
                    className={estiloInput}
                  />
                  <p className="mt-1 min-h-4 text-xs text-orange-400">
                    {erros.nota}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">
                Sinopse
              </label>

              <textarea
                name="descricao"
                value={livro.descricao}
                onChange={mudarCampo}
                rows="5"
                className={`${estiloInput} resize-none`}
              />

              <p className="mt-1 min-h-4 text-xs text-orange-400">
                {erros.descricao}
              </p>
            </div>

            {mensagem && (
              <p className="rounded border border-orange-500 p-3 text-sm text-orange-400">
                {mensagem}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={enviando}
                className="rounded bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50"
              >

                {enviando
                  ? (
                    modoEdicao
                      ? "Salvando..."
                      : "Cadastrando..."
                  )
                  : (
                    modoEdicao
                      ? "Salvar alterações"
                      : "Cadastrar livro"
                  )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
}