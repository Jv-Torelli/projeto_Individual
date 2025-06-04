var dashboardModel = require('../models/dashboardModel')


async function obterKPIs(req, res) {
    const idUsuario = req.params.idUsuario;

    try {
        console.log("Recebido idUsuario:", idUsuario);
        
        const resultado = await dashboardModel.obterKPIs(idUsuario);

        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(404).json({ mensagem: "Nenhum dado encontrado" });
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar KPIs" });
    }
}

async function obterDadosGrafico(req, res) {
    const { idUsuario } = req.params;

    try {
        const dados = await dashboardModel.obterCurtidasPorPost(idUsuario);
        res.json(dados);
    } catch (error) {
        console.error('Erro ao obter dados do gráfico:', error);
        res.status(500).json({ erro: 'Erro ao obter dados do gráfico' });
    }
}


module.exports = {
    obterKPIs,
    obterDadosGrafico
}