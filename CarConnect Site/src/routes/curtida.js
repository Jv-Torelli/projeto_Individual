var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

// curtir
router.post("/", function (req, res) {
    curtidaController.curtirPost(req, res);
});

// descurtir 
router.delete("/", function (req, res) {
    curtidaController.descurtir(req, res);
});

// verificação de curtida
router.get("/verificar/:idPostagem/:idUsuario", function (req, res) {
    curtidaController.verificarCurtida(req, res);
});

// contar curtida
router.get("/contar/:idPostagem", function (req, res) {
    curtidaController.contarCurtidas(req, res);
});

module.exports = router;