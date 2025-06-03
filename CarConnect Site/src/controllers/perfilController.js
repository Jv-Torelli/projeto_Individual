var perfilModel = require('../models/perfilModel')

function adicionarPostagemAoFeed(req, res) {
    perfilModel.adicionarPostagemAoFeed()
        .then(postagens => {
            res.status(200).json(postagens);
        })
        .catch(erro => {
            console.error("Erro ao buscar postagens:", erro);
            res.status(500).json({ 
                success: false,
                message: "Erro ao carregar o feed" 
            });
        });
}

module.exports = {
    adicionarPostagemAoFeed
}