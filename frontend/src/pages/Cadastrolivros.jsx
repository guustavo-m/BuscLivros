import { useState } from "react";

const formularioVazio = {
  titulo: "",
  autor: "",
  categoria: "",
  editora: "",
  ano: "",
  paginas: "",
  nota: "",
  imagem: "",
  descricao: ""
};

const estiloInput = "mt-1 w-full rounded-md border border-orange-500 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-orange-400";

export default function CadastroLivros() {
  const [livro, setLivro] = useState(formularioVazio);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  function mudarCampo(event) {
    const { name, value } = event.target;
    setLivro((prev) => ({ ...prev, [name]: value }));
  }

  function escolherImagem(event) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      setLivro((prev) => ({ ...prev, imagem: leitor.result }));
    };

    leitor.readAsDataURL(arquivo);
  }

  async function enviarFormulario(event) {
    event.preventDefault();
    setMensagem("");

    const camposObrigatorios = Object.values(livro).some((valor) => {
      if (typeof valor === "string") {
        return valor.trim() === "";
      }
      return valor === "";
    });

    if (camposObrigatorios) {
      setMensagem("Preencha todos os campos antes de cadastrar.");
      return;
    }

    setEnviando(true);

    try {
      console.log("Livro cadastrado:", livro);
      setLivro(formularioVazio);
      setMensagem("Livro cadastrado com sucesso!");
    } catch {
      setMensagem("Erro ao cadastrar o livro.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl rounded-xl border border-orange-500 bg-zinc-950 p-6">
        <h1 className="mb-2 text-3xl font-bold">Cadastrar Livro</h1>
        <p className="mb-8 text-sm text-zinc-400">Preencha as informações do livro.</p>

        <form onSubmit={enviarFormulario} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <div>
              <label className="text-sm font-semibold">Imagem da capa</label>

              <div className="mt-2 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-orange-500 bg-zinc-900 p-4">
                {livro.imagem ? (
                  <img src={livro.imagem} alt="Capa do livro" className="mb-4 h-44 w-32 rounded object-cover" />
                ) : (
                  <div className="mb-4 flex h-44 w-32 items-center justify-center bg-zinc-800 text-center text-xs text-zinc-500">
                    Sem imagem
                  </div>
                )}

                <label className="cursor-pointer rounded border border-zinc-500 px-3 py-2 text-xs hover:border-orange-400">
                  Escolher imagem
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={escolherImagem} className="hidden" />
                </label>
              </div>

              <p className="mt-2 text-xs text-zinc-500">JPG, PNG ou WEBP.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold">Título</label>
                <input name="titulo" value={livro.titulo} onChange={mudarCampo} className={estiloInput} />
              </div>

              <div>
                <label className="text-sm font-semibold">Autor</label>
                <input name="autor" value={livro.autor} onChange={mudarCampo} className={estiloInput} />
              </div>

              <div>
                <label className="text-sm font-semibold">Categoria</label>
                <input name="categoria" value={livro.categoria} onChange={mudarCampo} className={estiloInput} />
              </div>

              <div>
                <label className="text-sm font-semibold">Editora</label>
                <input name="editora" value={livro.editora} onChange={mudarCampo} className={estiloInput} />
              </div>

              <div>
                <label className="text-sm font-semibold">Ano de publicação</label>
                <input type="number" name="ano" value={livro.ano} onChange={mudarCampo} className={estiloInput} />
              </div>

              <div>
                <label className="text-sm font-semibold">Número de páginas</label>
                <input type="number" name="paginas" value={livro.paginas} onChange={mudarCampo} className={estiloInput} />
              </div>

              <div>
                <label className="text-sm font-semibold">Nota</label>
                <input type="number" min="0" max="10" step="0.1" name="nota" value={livro.nota} onChange={mudarCampo} className={estiloInput} />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Sinopse</label>
            <textarea name="descricao" value={livro.descricao} onChange={mudarCampo} rows="5" className={`${estiloInput} resize-none`} />
          </div>

          {mensagem && <p className="rounded border border-orange-500 p-3 text-sm text-orange-400">{mensagem}</p>}

          <div className="flex justify-end">
            <button type="submit" disabled={enviando} className="rounded bg-orange-500 px-5 py-3 font-semibold text-black hover:bg-orange-400 disabled:opacity-50">
              {enviando ? "Cadastrando..." : "Cadastrar livro"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
