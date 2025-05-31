var database = require("../database/config");

function criarComentario(texto, idPostagem, idUsuario) {
    console.log("ACESSEI O COMENTARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarComentario():", texto, idPostagem, idUsuario);
    
    var instrucaoSql = `
        INSERT INTO comentario (texto, dtComent, fkPostagem, fkUsuario) 
        VALUES ('${texto}', CURDATE(), ${idPostagem}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarComentarios(idPostagem) {
    console.log("ACESSEI O COMENTARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarComentarios():", idPostagem);
    
    var instrucaoSql = `
        SELECT 
            c.idcomentario,
            c.texto,
            c.dtComent,
            c.fkPostagem,
            c.fkUsuario,
            u.nome as nomeUsuario,
            u.fotoPerfil
        FROM comentario c
        JOIN usuario u ON c.fkUsuario = u.idusuario
        WHERE c.fkPostagem = ${idPostagem}
        ORDER BY c.dtComent ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarComentarios(idPostagem) {
    console.log("ACESSEI O COMENTARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarComentarios():", idPostagem);
    
    var instrucaoSql = `
        SELECT COUNT(*) as totalComentarios FROM comentario 
        WHERE fkPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirComentario(idComentario, idUsuario) {
    console.log("ACESSEI O COMENTARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirComentario():", idComentario, idUsuario);
    
    var instrucaoSql = `
        DELETE FROM comentario 
        WHERE idcomentario = ${idComentario} AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    criarComentario,
    listarComentarios,
    contarComentarios,
    excluirComentario
};