var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idusuario, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, dtNascimento, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, dtNascimento, senha);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, dtNascimento, senha) VALUES ('${nome}', '${email}', '${dtNascimento}','${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function uploadImagemPerfil(idUsuario, imagemBase64) {
   
    const query = `
        UPDATE usuario 
        SET fotoPerfil = ? 
        WHERE idusuario = ?
    `;
    
    return database.executarComParametros(query, [imagemBase64, idUsuario]);
}

function carregarImagemPerfil(idUsuario) {
 
    const query = `
        SELECT idusuario, fotoPerfil FROM usuario WHERE idusuario = ?
    `;
    
    return database.executarComParametros(query, [idUsuario]);
}


module.exports = {
    autenticar,
    cadastrar,
    uploadImagemPerfil,
    carregarImagemPerfil
};