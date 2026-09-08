import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { cadastro } from "../services/api";

export default function Cadastro() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }
    
    setCarregando(true);

    try {
      const dados = await cadastro(nome, email, senha);
      console.log("Cadastro realizado:", dados);
    } catch (erro) {
      setErro(erro.message);
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

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="nome" className="mb-2 block text-xs font-medium text-white">
              Nome Completo
            </label>

            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Seu Nome"
              required
              minLength={3}
              autoComplete="name"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-medium text-white">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
              required
              autoComplete="email"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />
          </div>

          <div>
            <label htmlFor="senha" className="mb-2 block text-xs font-medium text-white">
              Senha
            </label>

            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Mínimo de 6 caracteres"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="mb-2 block text-xs font-medium text-white">
              Confirmar Senha
            </label>

            <input
              id="confirmarSenha"
              type="password"
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
              placeholder="Repita a sua senha"
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-md border border-[#ff7800] bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ff9a3d] focus:ring-1 focus:ring-[#ff7800]"
            />
          </div>

          {erro && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-md bg-[#ff7800] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#ff8c1a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
            {carregando ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          Já tem conta?{" "}

          <Link
            to="/login"
            className="font-semibold text-[#ff7800] transition hover:text-[#ff9a3d]">
            Entrar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
