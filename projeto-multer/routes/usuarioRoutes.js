const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrarUsuario);
router.get('/listar', usuarioController.listarUsuarios);

module.exports = router;