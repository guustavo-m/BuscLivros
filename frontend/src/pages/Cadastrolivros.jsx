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