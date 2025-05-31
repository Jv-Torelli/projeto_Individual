var curtidaModel = require("../models/curtidaModel");

function curtir(req, res) {
    var idPostagem = req.body.idPostagem;
    var idUsuario = req.body.idUsuario;

    if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else if (idUsuario == undefined) {
        res.status(400).json({ erro: "Seu ID do usuário está undefined!" });
    } else {
        curtidaModel.curtir(idPostagem, idUsuario)
            .then(function (resultado) {
                // Após curtir, buscar o total de curtidas
                return curtidaModel.contarCurtidas(idPostagem);
            })
            .then(function (resultadoContagem) {
                console.log(`\nResultados encontrados: ${resultadoContagem.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoContagem)}`);

                if (resultadoContagem.length > 0) {
                    res.status(200).json({
                        mensagem: "Postagem curtida com sucesso!",
                        totalCurtidas: resultadoContagem[0].totalCurtidas
                    });
                } else {
                    res.status(204).json({
                        mensagem: "Postagem curtida, mas erro ao contar curtidas",
                        totalCurtidas: 0
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao curtir a postagem! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function descurtir(req, res) {
    var idPostagem = req.body.idPostagem;
    var idUsuario = req.body.idUsuario;

    if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else if (idUsuario == undefined) {
        res.status(400).json({ erro: "Seu ID do usuário está undefined!" });
    } else {
        curtidaModel.descurtir(idPostagem, idUsuario)
            .then(function (resultado) {
                // Após descurtir, buscar o total de curtidas
                return curtidaModel.contarCurtidas(idPostagem);
            })
            .then(function (resultadoContagem) {
                console.log(`\nResultados encontrados: ${resultadoContagem.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoContagem)}`);

                if (resultadoContagem.length > 0) {
                    res.status(200).json({
                        mensagem: "Curtida removida com sucesso!",
                        totalCurtidas: resultadoContagem[0].totalCurtidas
                    });
                } else {
                    res.status(204).json({
                        mensagem: "Curtida removida, mas erro ao contar curtidas",
                        totalCurtidas: 0
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao descurtir a postagem! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function verificarCurtida(req, res) {
    var idPostagem = req.params.idPostagem;
    var idUsuario = req.params.idUsuario;

    if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else if (idUsuario == undefined) {
        res.status(400).json({ erro: "Seu ID do usuário está undefined!" });
    } else {
        curtidaModel.verificarCurtida(idPostagem, idUsuario)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.length > 0) {
                    res.status(200).json({
                        curtiu: resultado[0].curtiu > 0
                    });
                } else {
                    res.status(200).json({
                        curtiu: false
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao verificar curtida! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function contarCurtidas(req, res) {
    var idPostagem = req.params.idPostagem;

    if (idPostagem == undefined) {
        res.status(400).json({ erro: "Seu ID da postagem está undefined!" });
    } else {
        curtidaModel.contarCurtidas(idPostagem)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.length > 0) {
                    res.status(200).json({
                        totalCurtidas: resultado[0].totalCurtidas
                    });
                } else {
                    res.status(200).json({
                        totalCurtidas: 0
                    });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao contar curtidas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    curtir,
    descurtir,
    verificarCurtida,
    contarCurtidas
};