var express = require('express');
var router = express.Router();
var perfilController = require('../controllers/perfilController');

router.get("/postPerfil: idUsuario", perfilController.adicionarPostagemAoFeed);

module.exports = router;
