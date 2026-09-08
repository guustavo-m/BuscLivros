const express = require('express');
const router = express.Router();

const LivrosController = require('../controllers/livrosController');

router.get('/', LivrosController.listarTodos);

router.get('/:id', LivrosController.buscarPorId);

router.post('/', LivrosController.criar);

router.put('/:id', LivrosController.atualizar);

router.delete('/:id', LivrosController.deletar);

module.exports = router;
