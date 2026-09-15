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