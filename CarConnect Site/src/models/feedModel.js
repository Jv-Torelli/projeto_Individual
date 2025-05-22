var database = requise("../database/config");

function criarNovaPostagem(imagem, descricao, fkUsuario ){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarNovaPostagem(): ")
    var instrucaoSql = `
    INSERT INTO postagem (urlImagem, conteudo, fkUsuario)
    VALUES ('${imagem}', '${descricao}', '${fkUsuario}');
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarNovaPostagemAoFeed(idUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarPost(): ")
    var instrucaoSql = `
    SELECT idusuario, urlImagem, conteudo FROM postagem JOIN usuario
    ON idusuario = fkUsuario WHERE idusuario = ${idUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    criarNovaPostagem,
    adicionarNovaPostagemAoFeed
}