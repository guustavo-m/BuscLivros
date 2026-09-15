const UsuarioModel = require('../models/usuariosModel');

async function listarTodos(req, res) {
  try {
    const usuarios = await UsuarioModel.listarTodos();

    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao listar usuários',
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

    const usuario = await UsuarioModel.buscarPorId(id);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({
        mensagem: `Usuário ${id} não encontrado`
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao buscar usuário',
      erro: erro.message
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const novousuario = await UsuarioModel.criar({
      nome,
      email,
      senha
    });

    res.status(201).json(novousuario);
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao criar usuário',
      erro: erro.message
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);

    const {
      nome,
      email,
      tipo
    } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: 'ID inválido'
      });
    }

    if (!nome || !email) {
      return res.status(400).json({
        mensagem: 'Nome e e-mail são obrigatórios'
      });
    }

    if (tipo !== 'user' && tipo !== 'admin') {
      return res.status(400).json({
        mensagem: 'O tipo deve ser "user" ou "admin"'
      });
    }

    const usuarioAtualizado =
      await UsuarioModel.atualizar(id, {
        nome,
        email,
        tipo
      });

    if (usuarioAtualizado) {
      return res.status(200).json(usuarioAtualizado);
    }

    return res.status(404).json({
      mensagem: `Usuário ${id} não encontrado`
    });

  } catch (erro) {
    console.error(
      'Erro ao atualizar usuário:',
      erro
    );

    res.status(500).json({
      mensagem: 'Erro ao atualizar usuário',
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

    const deletado = await UsuarioModel.deletar(id);

    if (deletado) {
      res.status(200).json({
        mensagem: `Usuário ${id} removido com sucesso`
      });
    } else {
      res.status(404).json({
        mensagem: `Usuário ${id} não encontrado`
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: 'Erro ao deletar usuário',
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