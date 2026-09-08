const LivrosModel = require('../models/livrosModel');

async function listarTodos(req, res) {
  try {
    const livros = await LivrosModel.listarTodos();
    res.status(200).json(livros);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar livros', 
      erro: erro.message 
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const livro = await LivrosModel.buscarPorId(id);
    
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ 
        mensagem: `Livro ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar livro',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota } = req.body;
    
    if (!titulo || !ano || !editora || !autor || !imagem || !descricao || !paginas || !categoria || !nota) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novoLivro = await LivrosModel.criar({ 
      titulo, 
      ano, 
      editora, 
      autor, 
      imagem, 
      descricao, 
      paginas, 
      categoria, 
      nota
    });
    
    res.status(201).json(novoLivro);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar livro',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!titulo || !ano || !editora || !autor || !imagem || !descricao || !paginas || !categoria || !nota) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const livroAtualizado = await LivrosModel.atualizar(id, { 
      titulo, 
      ano, 
      editora, 
      autor, 
      imagem, 
      descricao, 
      paginas, 
      categoria, 
      nota
    });
    
    if (livroAtualizado) {
      res.status(200).json(livroAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Livro ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar livro',
      erro: erro.message 
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await LivrosModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Livro ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Livro ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar livro',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
