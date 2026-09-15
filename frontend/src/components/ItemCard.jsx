import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ItemCard({ livro }) {
  const navigate = useNavigate();

  function abrirDetalhes() {
    navigate(`/livro/${livro.id}`);
  }

  return (
    <div
      onClick={abrirDetalhes}
      className="w-full max-w-[275px] bg-[#454545] text-white cursor-pointer overflow-hidden transition duration-300 hover:scale-[1.02]"
    >

      <div className="relative h-[285px] bg-black">
        <img
          src={livro.imagem}
          alt={livro.titulo}
          className="w-full h-full object-cover"
        />

        <div
          className="absolute top-2 left-2 bg-[#ff8c00] text-white w-[27px] h-[27px] rounded-md flex flex-col items-center justify-center text-[9px]"
        >
          <FaStar />
          <span>{livro.nota}</span>
        </div>

     
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 text-[#ff8c00] text-lg hover:text-white"
        >
          <FaHeart />
        </button>
      </div>


      <div className="p-2">

        <h2
          className="font-serif text-[18px] leading-5 min-h-[42px] mb-2"
        >
          {livro.titulo}
        </h2>

        <div
          className="flex justify-between text-[8px] text-gray-300 mb-2"
        >
          <span>{livro.ano}</span>

          <span className="truncate max-w-[90px]">
            {livro.autor}
          </span>

          <span>
            {livro.paginas}pg
          </span>
        </div>

        <p
          className="text-[9px] leading-[11px] text-gray-200 h-[58px] overflow-hidden mb-2"
        >
          <span>Descrição: </span>
          {livro.descricao}
        </p>

        <p className="text-[10px] mb-2">
          <span className="font-semibold">
            Editora:
          </span>{" "}
          {livro.editora}
        </p>

        <span
          className="inline-block border border-[#b56500] rounded px-3 py-[1px] text-[9px]"
        >
          {livro.categoria}
        </span>
      </div>
    </div>
  );
}

