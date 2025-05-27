var database = require("../database/config");

function criarNovaPostagemBase64(imagem, descricao, fkUsuario) {
    console.log("Dados recebidos no model:", {
        tamanhoImagem: imagem.length,
        descricao: descricao,
        fkUsuario
    });

    const instrucaoSql = `
        INSERT INTO postagem (urlFoto, conteudo, fkUsuario)
        VALUES ('${imagem}', '${descricao}', ${fkUsuario});
    `;

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