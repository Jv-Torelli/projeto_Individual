CREATE DATABASE carConnect;
USE carConnect;

CREATE TABLE usuario (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(80) NOT NULL,
    dtNascimento DATE,
    bio VARCHAR(200),
    fotoPerfil VARCHAR(500),
    dtCriacaoConta DATE
);

CREATE TABLE postagem (
    idpostagem INT PRIMARY KEY AUTO_INCREMENT,
    conteudo VARCHAR(200),
    dtPostagem DATE,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idusuario)
);

CREATE TABLE curtida (
    idcurtida INT PRIMARY KEY AUTO_INCREMENT,
    fkPostagem INT,
    fkUsuario INT,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idpostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idusuario)
);

CREATE TABLE comentario (
    idcomentario INT PRIMARY KEY AUTO_INCREMENT,
    texto VARCHAR(100),
    dtComent DATE,
    fkPostagem INT,
    fkUsuario INT,
    FOREIGN KEY (fkPostagem) REFERENCES postagem(idpostagem),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idusuario)
);

CREATE TABLE seguidores (
    idseguidores INT PRIMARY KEY AUTO_INCREMENT,
    dataComecouSeguir DATE,
    fkUsuario INT,
    fkUsuarioSeguindo INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idusuario),
    FOREIGN KEY (fkUsuarioSeguindo) REFERENCES usuario(idusuario)
);
