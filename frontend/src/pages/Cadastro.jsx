import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { cadastro } from "../services/api";
import { useAuth } from "../context/useAuth";

const cadastroSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(1, "Informe seu nome.")
      .min(3, "O nome deve ter pelo menos 3 caracteres."),

    email: z
      .string()
      .trim()
      .min(1, "Informe seu e-mail.")
      .email("Informe um e-mail válido."),

    senha: z
      .string()
      .min(1, "Informe sua senha.")
      .min(
        6,
        "A senha deve ter pelo menos 6 caracteres."
      ),

    confirmarSenha: z
      .string()
      .min(
        1,
        "Confirme sua senha."
      ),
  })
  .refine(
    (dados) => dados.senha === dados.confirmarSenha,
    {
      path: ["confirmarSenha"],
      message: "As senhas não são iguais.",
    }
  );

export default function Cadastro() {
  const navigate = useNavigate();
  const { fazerLogin } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erros, setErros] = useState({});
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function mudarCampo(event) {
    const { name, value } = event.target;

    if (name === "nome") {
      setNome(value);
    }

    if (name === "email") {
      setEmail(value);
    }

    if (name === "senha") {
      setSenha(value);
    }

    if (name === "confirmarSenha") {
      setConfirmarSenha(value);
    }

    setErros((prev) => ({
      ...prev,
      [name]: "",
    }));

    setErro("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setErros({});

    const resultado =
      cadastroSchema.safeParse({
        nome,
        email,
        senha,
        confirmarSenha,
      });

    if (!resultado.success) {
      const novosErros = {};
      resultado.error.issues.forEach(
        (issue) => {
          const campo = issue.path[0];
          novosErros[campo] =
            issue.message;
        }
      );
      setErros(novosErros);
      return;
    }

    setCarregando(true);

    try {
      const dados = await cadastro(
        resultado.data.nome,
        resultado.data.email,
        resultado.data.senha
      );

      fazerLogin(dados);
      navigate("/");

    } catch (erro) {
      setErro(
        erro.message ||
          "Não foi possível criar a conta."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthLayout>
      <div className="mt-10">
        <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Criar conta
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Registre-se como voluntário do BuscLivros.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-xs font-medium text-white"
            >
              Nome Completo
            </label>

            <input
              id="nome"
              name="nome"
              type="text"
              value={nome}
              onChange={mudarCampo}
              placeholder="Seu Nome"
              autoComplete="name"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />

            {erros.nome && (
              <p className="mt-2 text-xs text-red-400">
                {erros.nome}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-medium text-white"
            >
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={mudarCampo}
              placeholder="voce@email.com"
              autoComplete="email"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />

            {erros.email && (
              <p className="mt-2 text-xs text-red-400">
                {erros.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-xs font-medium text-white"
            >
              Senha
            </label>

            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={mudarCampo}
              placeholder="Mínimo de 6 caracteres"
              autoComplete="new-password"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />

            {erros.senha && (
              <p className="mt-2 text-xs text-red-400">
                {erros.senha}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmarSenha"
              className="mb-2 block text-xs font-medium text-white"
            >
              Confirmar Senha
            </label>

            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={mudarCampo}
              placeholder="Repita a sua senha"
              autoComplete="new-password"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />

            {erros.confirmarSenha && (
              <p className="mt-2 text-xs text-red-400">
                {erros.confirmarSenha}
              </p>
            )}
          </div>

          {erro && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-md bg-[#ff7800] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#ff8c1a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando
              ? "Criando..."
              : "Criar Conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#ff7800] transition hover:text-[#ff9a3d]"
          >
            Entrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}