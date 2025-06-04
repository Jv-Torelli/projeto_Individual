var database = require("../database/config");


function obterKPIs(idUsuario) {
    const instrucaoSql = `
        SELECT 
            u.idusuario,
            u.nome,
            COUNT(DISTINCT p.idpostagem) AS total_posts,
            COUNT(DISTINCT c.idcomentario) AS total_comentarios,
            COUNT(DISTINCT cu.idcurtida) AS total_curtidas,
            (COUNT(DISTINCT c.idcomentario) + COUNT(DISTINCT cu.idcurtida)) AS total_interacoes
        FROM usuario u
        LEFT JOIN postagem p ON p.fkUsuario = u.idusuario
        LEFT JOIN comentario c ON c.fkPostagem = p.idpostagem
        LEFT JOIN curtida cu ON cu.fkPostagem = p.idpostagem
        WHERE u.idusuario = ${idUsuario}
        GROUP BY u.idusuario, u.nome;
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    obterKPIs,
};