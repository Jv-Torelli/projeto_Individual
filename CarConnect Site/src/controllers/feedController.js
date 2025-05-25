var feedModel = require("../models/feedModel");

async function criarNovaPostagemBase64(req, res) {
    try {
        
        const { imagemBase64, legenda } = req.body;
        
        if (!imagemBase64 || !legenda) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                detalhes: !imagemBase64 ? 'Imagem faltando' : '',
                detalhes: !legenda ? 'Legenda faltando' : ''
            });
        }

        const idUsuario = req.user_id;
        
        if (!idUsuario || isNaN(idUsuario)) {
            return res.status(400).json({ 
                error: 'ID do usuário inválido',
                detalhes: `ID recebido: ${idUsuario}`
            });
        }

        const fkUsuario = Number(idUsuario);

        const resultado = await feedModel.criarNovaPostagemBase64(
            imagemBase64, 
            legenda, 
            fkUsuario
        );

        // 5. Retornar resposta adequada
        return res.status(201).json({ 
            mensagem: "Post criado com sucesso", 
            idPost: resultado.insertId,
            usuarioId: fkUsuario
        });

    } catch (error) {
        console.error("Erro completo ao criar post:", error);
        
        const mensagemErro = process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'Erro ao criar post';
            
        res.status(500).json({ 
            error: mensagemErro,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

module.exports = {
    criarNovaPostagemBase64
};