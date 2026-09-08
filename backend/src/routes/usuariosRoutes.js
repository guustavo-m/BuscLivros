const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/usuariosController');

router.get('/', UsuariosController.listarTodos);

router.get('/:id', UsuariosController.buscarPorId);

router.post('/', UsuariosController.criar);

router.put('/:id', UsuariosController.atualizar);

router.delete('/:id', UsuariosController.deletar);

module.exports = router;
