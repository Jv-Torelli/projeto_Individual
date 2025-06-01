const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


router.post('/cadastrar', usuarioController.cadastrar);
router.post('/autenticar', usuarioController.autenticar);
router.post("/upload/perfil/base64", usuarioController.uploadImagemPerfil);
router.get("/imagem/perfil/:idUsuario", usuarioController.carregarImagemPerfil);

module.exports = router;