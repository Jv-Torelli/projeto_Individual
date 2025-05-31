var curtidaModel = require("../models/curtidaModel");

async function curtirPost(req, res) {
    const { idPostagem, idUsuario } = req.body;

    try {
        await curtidaModel.curtirPost(idPostagem, idUsuario);
        const resultado = await curtidaModel.contarCurtidas(idPostagem);

        const totalCurtidas = resultado[0].totalCurtidas;

        res.json({ sucesso: true, totalCurtidas });
    } catch (erro) {
        console.error("Erro ao curtir:", erro);
        res.status(500).json({ sucesso: false, erro: erro.message });
    }
}

async function descurtir(req, res) {
    const { idPostagem, idUsuario } = req.body;

    try {
        await curtidaModel.descurtir(idPostagem, idUsuario);
        const resultado = await curtidaModel.contarCurtidas(idPostagem);

        const totalCurtidas = resultado[0].totalCurtidas;

        res.json({ sucesso: true, totalCurtidas });
    } catch (erro) {
        console.error("Erro ao descurtir:", erro);
        res.status(500).json({ sucesso: false, erro: erro.message });
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
    curtirPost,
    descurtir,
    verificarCurtida,
    contarCurtidas
};