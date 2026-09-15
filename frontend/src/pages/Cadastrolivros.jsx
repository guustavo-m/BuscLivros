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
