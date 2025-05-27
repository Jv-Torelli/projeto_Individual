var feedModel = require("../models/feedModel");

async function criarNovaPostagemBase64(req, res) {
    try {
        const { imagemBase64, legenda, idUsuario } = req.body;

        if (!imagemBase64 || !legenda || !idUsuario) {
            return res.status(400).json({ 
                error: 'Dados incompletos',
                detalhes: {
                    imagemFaltando: !imagemBase64,
                    legendaFaltando: !legenda,
                    idUsuarioFaltando: !idUsuario
                }
            });
        }

        const fkUsuario = parseInt(idUsuario);
        if (isNaN(fkUsuario)) {
            return res.status(400).json({ 
                error: 'ID do usuário inválido',
                recebido: idUsuario,
                tipo: typeof idUsuario
            });
        }

        console.log('Dados sendo enviados ao model:', {
            tamanhoImagem: imagemBase64.length,
            legenda: legenda,
            fkUsuario
        });

        const resultado = await feedModel.criarNovaPostagemBase64(
            imagemBase64, 
            legenda, 
            fkUsuario
        );

        if (!resultado || !resultado.insertId) {
            throw new Error('O model não retornou um ID válido');
        }

        return res.status(201).json({
            success: true,
            postId: resultado.insertId,
            usuarioId: fkUsuario
        });

    } catch (error) {
        console.error("Erro detalhado no controller:", {
            mensagem: error.message,
            stack: error.stack,
            bodyRecebido: req.body
        });
        
        return res.status(500).json({
            error: 'Erro ao criar postagem',
            detalhes: process.env.NODE_ENV === 'development' ? {
                mensagem: error.message,
                stack: error.stack
            } : undefined
        });
    }
}

module.exports = {
    criarNovaPostagemBase64
};