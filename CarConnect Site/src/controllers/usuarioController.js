var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
         usuarioModel.autenticar(email, senha)
        .then(function (resultadoAutenticar) {
            if (resultadoAutenticar.length == 1) {
                const usuario = resultadoAutenticar[0];
                console.log(`Tentando login com: ${email} e ${senha}`);

                // Salva id na sessão
                req.session.usuarioId = usuario.idusuario;  // Atenção: no model, a coluna é "idusuario"

                res.json({
                    id: usuario.idusuario,
                    nome: usuario.nome,
                    email: usuario.email
                });
            } else if (resultadoAutenticar.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var dtNascimento = req.body.dtNascimentoServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }else if(dtNascimento == undefined){
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, dtNascimento, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function uploadImagemPerfil(req, res) {
    const idusuario = req.session.usuarioId;  // pega da sessão
    const imagem = req.file ? `/uploads/perfil/${req.file.filename}` : null;

    if (!imagem || !idusuario) {
        return res.status(400).json({ erro: "Dados insuficientes (imagem ou usuário ausente)." });
    }

    usuarioModel.uploadImagemPerfil(idusuario, imagem)
        .then(() => res.status(200).json({ mensagem: "Imagem atualizada com sucesso." }))
        .catch((erro) => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao atualizar imagem de perfil." });
        });
}


function carregarImagemPerfil(req, res) {
    // pegar o id do usuário
    var idusuario = req.params.idusuario;
    
    usuarioModel.carregarImagemPerfil(idusuario)
        .then(resultado => {
            if (resultado.length > 0) {
           
                res.json({ fotoPerfil: imagem });
            } else {
                res.status(404).json({ mensagem: "Usuário não encontrado ou sem foto de perfil" });
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: "Erro ao carregar imagem de perfil" });
        });
}


module.exports = {
    autenticar,
    cadastrar,
    uploadImagemPerfil,
    carregarImagemPerfil
}