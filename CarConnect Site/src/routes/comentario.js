var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

// Rota de criação do coment
router.post("/coment", function (req, res) {
    comentarioController.criarComentario(req, res);
});

// listando coment
router.get("/:idPostagem", function (req, res) {
    comentarioController.listarComentarios(req, res);
});

// contando coment
router.get("/contar/:idPostagem", function (req, res) {
    comentarioController.contarComentarios(req, res);
});

// excluir um comentário (desejável/funcionando)
router.delete("/:idComentario", function (req, res) {
    comentarioController.excluirComentario(req, res);
});

module.exports = router;