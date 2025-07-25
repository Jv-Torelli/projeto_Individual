-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE carConnect;
USE carConnect;	



CREATE TABLE usuario (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL UNIQUE,
    email VARCHAR(80) NOT NULL,
    dtNascimento DATE,
    fotoPerfil LONGTEXT,
    senha VARCHAR(12)
);


CREATE TABLE postagem (
    idpostagem INT PRIMARY KEY AUTO_INCREMENT,
    urlFoto LONGTEXT,
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

-- CREATE USER 'root'@'%' IDENTIFIED BY 'Jv190107';
-- GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

