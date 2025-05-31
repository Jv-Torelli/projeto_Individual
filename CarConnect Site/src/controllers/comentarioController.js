var comentarioModel = require("../models/comentarioModel");

function criarComentario(req, res) {
    var texto = req.body.texto;
    var idPostagem = req.body.idPostagem;
    var idUsuario = req.body.idUsuario;

    if (texto == undefined) {
        res.status(400).json({ erro: "Seu texto está undefined!" });
    } else if (texto.length == 0) {
        res.status(400).json({ erro: "O comentário não pode estar vazio!" });
    } else if (texto.length > 100) {
        res.status(400).json({ erro: "O comentário deve ter no máximo 100 caracteres!" });
    } else if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else if (idUsuario == undefined) {
        res.status(400).json({ erro: "Seu ID do usuário está undefined!" });
    } else {
        // Sanitizar o texto para evitar SQL injection
        texto = texto.replace(/'/g, "''");

        comentarioModel.criarComentario(texto, idPostagem, idUsuario)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                res.status(201).json({
                    mensagem: "Comentário criado com sucesso!",
                    idComentario: resultado.insertId
                });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao criar o comentário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarComentarios(req, res) {
    var idPostagem = req.params.idPostagem;

    if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else {
        comentarioModel.listarComentarios(idPostagem)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Primeiros resultados:`);
                console.log(resultado);

                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(200).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os comentários! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function contarComentarios(req, res) {
    var idPostagem = req.params.idPostagem;

    if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else {
        comentarioModel.contarComentarios(idPostagem)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.length > 0) {
                    res.status(200).json({
                        totalComentarios: resultado[0].totalComentarios
                    });
                } else {
                    res.status(200).json({
                        totalComentarios: 0
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao contar comentários! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function excluirComentario(req, res) {
    var idComentario = req.params.idComentario;
    var idUsuario = req.body.idUsuario;

    if (idComentario == undefined) {
        res.status(400).json({ erro: "Seu ID do comentário está undefined!" });
    } else if (idUsuario == undefined) {
        res.status(400).json({ erro: "Seu ID do usuário está undefined!" });
    } else {
        comentarioModel.excluirComentario(idComentario, idUsuario)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.affectedRows > 0) {
                    res.status(200).json({
                        mensagem: "Comentário excluído com sucesso!"
                    });
                } else {
                    res.status(404).json({
                        erro: "Comentário não encontrado ou você não tem permissão para excluí-lo"
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao excluir o comentário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    criarComentario,
    listarComentarios,
    contarComentarios,
    excluirComentario
};