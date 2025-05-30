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

function adicionarPostagemAoFeed() {
    console.log("ACESSEI O POST MODEL - adicionarNovaPostagemAoFeed()");
    
    var instrucaoSql = `
   SELECT 
            p.idpostagem,
            p.conteudo,
            p.urlFoto,
            DATE_FORMAT(p.dtPostagem, '%d/%m/%Y %H:%i') as dtPostagem,
            u.idusuario,
            u.nome,
            u.fotoPerfil
        FROM postagem p
        JOIN usuario u ON p.fkUsuario = u.idusuario
        ORDER BY p.dtPostagem DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    criarNovaPostagemBase64,
    adicionarPostagemAoFeed
}