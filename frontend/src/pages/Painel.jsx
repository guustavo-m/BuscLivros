import { useEffect, useState } from "react";
import { FaTrash, FaSyncAlt } from "react-icons/fa";

export default function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(null);

  const API_URL = "http://localhost:3000&quot";

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
        throw new Error(
          dados.mensagem || "Erro ao carregar usuários."
        );
      }
      setUsuarios(dados);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  async function excluirUsuario(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
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
        throw new Error(
          dados.mensagem || "Erro ao excluir usuário."
        );
      }

      setUsuarios((usuariosAtuais) =>
        usuariosAtuais.filter((usuario) => usuario.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert(error.message);
    } finally {
      setExcluindo(null);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarUsuarios();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-8">
        <div className="mx-auto mb-6 max-w-md rounded-xl bg-orange-500 py-2 text-center">
          <h1 className="font-serif text-lg text-black">
            Painel Admin
          </h1>
        </div>
        <div className="mx-auto mb-9 flex max-w-lg justify-center gap-10">
          <div className="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-gray-500">
            <span className="font-serif text-xl">
              {usuarios.length}
            </span>

            <span className="text-center text-xs">
              Contas Cadastradas
            </span>
          </div>

          <div className="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-gray-500">
            <span className="font-serif text-xl">
              0
            </span>

            <span className="text-center text-xs">
              Aguardando Aprovação
            </span>
          </div>
        </div>

        <section className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-orange-900 px-2 pb-2">

            <h2 className="mb-2 text-center font-serif text-sm">
              Pedidos em aguardo
            </h2>

            <div className="rounded-md border border-orange-900 px-4 py-5 text-center">
              <p className="text-sm text-gray-400">
                Nenhum pedido aguardando aprovação.
              </p>
            </div>

          </div>
        </section>

        <section className="mx-auto mt-4 max-w-2xl">

          <h2 className="mb-1 font-serif text-sm text-gray-400">
            Usuários cadastrados
          </h2>

          <div className="rounded-lg border border-orange-900 px-2 pb-2">

            <h2 className="mb-2 text-center font-serif text-sm">
              Cadastros
            </h2>

            <div className="mb-3 flex justify-end">
              <button
                onClick={carregarUsuarios}
                disabled={carregando}
                className="flex items-center gap-2 rounded-md border border-orange-700 px-3 py-1 text-xs text-orange-500 transition hover:bg-orange-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaSyncAlt
                  className={carregando ? "animate-spin" : ""}
                />
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
                      className="flex items-center justify-between rounded-md border border-orange-900 px-3 py-2"
                    >

                      <div className="min-w-0">
                        <p className="font-serif text-sm">
                          {usuario.nome}
                        </p>

                        <p className="truncate text-xs text-gray-400">
                          {usuario.email}
                        </p>
                      </div>

                      <div className="ml-3 flex items-center gap-2">

                        <button
                          onClick={() => excluirUsuario(usuario.id)}
                          disabled={excluindo === usuario.id}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-red-700 text-red-500 transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Excluir usuário"
                        >
                          {excluindo === usuario.id ? (
                            <span className="text-xs">
                              ...
                            </span>
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
  );
}