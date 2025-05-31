var database = require("../database/config");

function curtirPost(idPostagem, idUsuario) {
    console.log("ACESSEI O CURTIDA MODEL - curtirPost", idPostagem, idUsuario);

    var instrucaoSql = `
        INSERT INTO curtida (fkPostagem, fkUsuario)
        VALUES (${idPostagem}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function descurtir(idPostagem, idUsuario) {
    console.log("ACESSEI O CURTIDA MODEL - descurtir", idPostagem, idUsuario);

    var instrucaoSql = `
        DELETE FROM curtida
        WHERE fkPostagem = ${idPostagem} AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarCurtida(idPostagem, idUsuario) {
    console.log("ACESSEI O CURTIDA MODEL - verificarCurtida", idPostagem, idUsuario);

    var instrucaoSql = `
        SELECT COUNT(*) as curtiu
        FROM curtida
        WHERE fkPostagem = ${idPostagem} AND fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarCurtidas(idPostagem) {
    console.log("ACESSEI O CURTIDA MODEL - contarCurtidas", idPostagem);

    var instrucaoSql = `
        SELECT COUNT(*) as totalCurtidas
        FROM curtida
        WHERE fkPostagem = ${idPostagem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    curtirPost,
    descurtir,
    verificarCurtida,
    contarCurtidas
};