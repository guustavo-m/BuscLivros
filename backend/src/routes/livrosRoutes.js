const express = require('express');
const router = express.Router();
const LivrosController = require('../controllers/livrosController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', LivrosController.listarTodos);

router.get('/categorias', LivrosController.listarCategorias);

router.get('/:id', LivrosController.buscarPorId);

router.post('/', verificarToken, LivrosController.criar);

router.put('/:id', verificarToken, LivrosController.atualizar);

router.delete('/:id', verificarToken, LivrosController.deletar);

module.exports = router;