CREATE DATABASE carConnect;
USE carConnect;	


CREATE TABLE usuario (
    idusuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(80) NOT NULL,
    dtNascimento DATE,
    bio VARCHAR(200),
    fotoPerfil LONGTEXT,
    dtCriacaoConta DATE,
    senha VARCHAR(12)
);

select * from curtida;

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

CREATE USER 'root'@'%' IDENTIFIED BY 'Jv190107';
GRANT ALL PRIVILEGES ON . TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
