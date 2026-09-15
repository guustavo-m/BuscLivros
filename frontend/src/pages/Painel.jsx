import { useEffect, useState } from "react";
import { FaTrash, FaSyncAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Layout from "../components/Layout";

export default function Administrador() {
  const API_URL = "http://localhost:3000&quot";
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erroEdicao, setErroEdicao] = useState("");
  const [mensagemEdicao, setMensagemEdicao] = useState("");

  async function carregarUsuarios() {
    try {
      setCarregando(true);
      setErro("");

      const token = localStorage.getItem("token");

      if (!token) {
        setErro("Usuário não autenticado.");
        return;
      }

      const resposta = await fetch(`${API_URL}/usuarios`, {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao carregar usuários.");
      }

      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);

      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function editarUsuario(usuario) {
    setUsuarioEditando({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
    });

    setErroEdicao("");
    setMensagemEdicao("");
  }

  function mudarCampoEdicao(event) {
    const { name, value } = event.target;

    setUsuarioEditando((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErroEdicao("");
    setMensagemEdicao("");
  }

  function cancelarEdicao() {
    setUsuarioEditando(null);
    setErroEdicao("");
    setMensagemEdicao("");
  }

  async function salvarUsuario(event) {
    event.preventDefault();

    if (!usuarioEditando) {
      return;
    }

    setSalvando(true);
    setErroEdicao("");
    setMensagemEdicao("");

    try {
      const token = localStorage.getItem("token");

      const resposta = await fetch(
        `${API_URL}/usuarios/${usuarioEditando.id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nome: usuarioEditando.nome,
            email: usuarioEditando.email,
            tipo: usuarioEditando.tipo,
          }),
        },
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao atualizar usuário.");
      }

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.map((usuario) =>
          usuario.id === dados.id ? dados : usuario,
        ),
      );

      setMensagemEdicao("Usuário atualizado com sucesso!");

      setTimeout(() => {
        setUsuarioEditando(null);
        setMensagemEdicao("");
      }, 700);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);

      setErroEdicao(error.message || "Erro ao atualizar usuário.");
    } finally {
      setSalvando(false);
    }
  }

  async function excluirUsuario(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este usuário?",
    );

    if (!confirmar) {
      return;
    }

    try {
      setExcluindo(id);
      const token = localStorage.getItem("token");
      const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao excluir usuário.");
      }

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.filter((usuario) => usuario.id !== id),
      );

      if (usuarioEditando?.id === id) {
        setUsuarioEditando(null);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      alert(error.message);
    } finally {
      setExcluindo(null);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white">
        <main className="mx-auto min-h-screen max-w-5xl px-6 py-8">
          <div className="mx-auto mb-6 max-w-md rounded-xl bg-orange-500 py-3 text-center">
            <h1 className="font-serif text-lg text-black">Painel Admin</h1>
          </div>

          <div className="mx-auto mb-9 flex max-w-lg justify-center">
            <div className="flex h-20 w-32 flex-col items-center justify-center rounded-lg border border-gray-500">
              <span className="font-serif text-xl">{usuarios.length}</span>
              <span className="text-center text-xs">Contas Cadastradas</span>
            </div>
          </div>

          <section className="mx-auto max-w-2xl">
            {usuarioEditando ? (
              <div className="rounded-lg border border-orange-900 px-4 py-4">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-lg">Editar usuário</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      Altere os dados e a permissão da conta.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={cancelarEdicao}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition hover:border-red-500 hover:text-red-400"
                    title="Cancelar edição"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={salvarUsuario} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Nome</label>
                    <input
                      type="text"
                      name="nome"
                      value={usuarioEditando.nome}
                      onChange={mudarCampoEdicao}
                      className="mt-1 w-full rounded-md border border-orange-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={usuarioEditando.email}
                      onChange={mudarCampoEdicao}
                      className="mt-1 w-full rounded-md border border-orange-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Permissão</label>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setUsuarioEditando((prev) => ({
                            ...prev,
                            tipo: "user",
                          }))
                        }
                        className={`rounded-md border px-4 py-3 text-sm font-semibold transition ${
                          usuarioEditando.tipo === "user"
                            ? "border-orange-500 bg-orange-500 text-black"
                            : "border-gray-700 bg-zinc-950 text-gray-300 hover:border-orange-500"
                        }`}
                      >
                        Usuário
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setUsuarioEditando((prev) => ({
                            ...prev,
                            tipo: "admin",
                          }))
                        }
                        className={`rounded-md border px-4 py-3 text-sm font-semibold transition ${
                          usuarioEditando.tipo === "admin"
                            ? "border-orange-500 bg-orange-500 text-black"
                            : "border-gray-700 bg-zinc-950 text-gray-300 hover:border-orange-500"
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>

                  {erroEdicao && (
                    <div className="rounded-md border border-red-700 bg-red-950/30 px-3 py-2 text-sm text-red-400">
                      {erroEdicao}
                    </div>
                  )}

                  {mensagemEdicao && (
                    <div className="rounded-md border border-orange-500 bg-orange-500/10 px-3 py-2 text-sm text-orange-400">
                      {mensagemEdicao}
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={cancelarEdicao}
                      disabled={salvando}
                      className="flex items-center gap-2 rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white disabled:opacity-50"
                    >
                      <FaTimes />
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={salvando}
                      className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaSave />
                      {salvando ? "Salvando..." : "Salvar alterações"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="rounded-lg border border-orange-900 px-4 py-8 text-center">
                <p className="text-sm text-gray-400">
                  Clique no lápis de um usuário para editar seus dados.
                </p>
              </div>
            )}
          </section>

          <section className="mx-auto mt-6 max-w-2xl">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-serif text-sm text-gray-400">
                Usuários cadastrados
              </h2>
            </div>

            <div className="rounded-lg border border-orange-900 px-2 pb-2">
              <div className="mb-3 flex justify-end">
                <button
                  onClick={carregarUsuarios}
                  disabled={carregando}
                  className="flex items-center gap-2 rounded-md border border-orange-700 px-3 py-1 text-xs text-orange-500 transition hover:bg-orange-900 disabled:cursor-not-allowed disabled:opacity-50 mt-3"
                >
                  <FaSyncAlt className={carregando ? "animate-spin" : ""} />
                  Atualizar
                </button>
              </div>

              {erro && (
                <div className="mb-3 rounded-md border border-red-700 bg-red-950/30 px-3 py-2 text-center text-sm text-red-400">
                  {erro}
                </div>
              )}

              {carregando && (
                <div className="py-8 text-center text-sm text-gray-400">
                  Carregando usuários...
                </div>
              )}

              {!carregando && !erro && (
                <div className="space-y-1">
                  {usuarios.length === 0 ? (
                    <div className="rounded-md border border-orange-900 px-3 py-5 text-center">
                      <p className="text-sm text-gray-400">
                        Nenhum usuário cadastrado.
                      </p>
                    </div>
                  ) : (
                    usuarios.map((usuario) => (
                      <div
                        key={usuario.id}
                        className="flex items-center justify-between rounded-md border border-orange-900 px-3 py-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-serif text-sm">{usuario.nome}</p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                                usuario.tipo === "admin"
                                  ? "bg-orange-500 text-black"
                                  : "bg-zinc-800 text-gray-300"
                              }`}
                            >
                              {usuario.tipo === "admin" ? "ADMIN" : "USUÁRIO"}
                            </span>
                          </div>
                          <p className="truncate text-xs text-gray-400">
                            {usuario.email}
                          </p>
                        </div>

                        <div className="ml-3 flex items-center gap-2">
                          <button
                            onClick={() => editarUsuario(usuario)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-orange-700 text-orange-500 transition hover:bg-orange-900"
                            title="Editar usuário"
                          >
                            <FaEdit className="text-xs" />
                          </button>

                          <button
                            onClick={() => excluirUsuario(usuario.id)}
                            disabled={excluindo === usuario.id}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-red-700 text-red-500 transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                            title="Excluir usuário"
                          >
                            {excluindo === usuario.id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <FaTrash className="text-xs" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
