var database = require("../database/config");

function criarNovaPostagemBase64(imagem, descricao, fkUsuario ){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarNovaPostagem(): ")
    var instrucaoSql = `
    INSERT INTO postagem (urlFoto, conteudo, fkUsuario)
    VALUES ('${imagem}', '${descricao}', '${fkUsuario}');
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarNovaPostagemAoFeed(fkUsuario) {
    console.log("ACESSEI O POST MODEL - adicionarNovaPostagemAoFeed()");
    
    var instrucaoSql = `
    SELECT p.urlFoto, p.conteudo, u.nome 
    FROM postagem p
    JOIN usuario u ON u.idUsuario = p.fkUsuario 
    WHERE p.fkUsuario = ${fkUsuario}
    ORDER BY p.idPostagem DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    criarNovaPostagemBase64,
    adicionarNovaPostagemAoFeed
}