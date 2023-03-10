Create database biblioteca;
use biblioteca;

CREATE TABLE categoria (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (nome)
);

CREATE TABLE livro (
  id INT NOT NULL AUTO_INCREMENT,
  registro INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  data_publicacao DATE NOT NULL,
  categoria_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (registro),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  matricula VARCHAR(10) NOT NULL,
  senha VARCHAR(32) NOT NULL,
  administrador TINYINT(1) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (matricula)
);

CREATE TABLE busca (
  id INT NOT NULL AUTO_INCREMENT,
  codigo INT NOT NULL,
  data_consulta DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (codigo)
);

CREATE TABLE resultado_busca (
  id INT NOT NULL AUTO_INCREMENT,
  busca_id INT NOT NULL,
  livro_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (busca_id) REFERENCES busca(id),
  FOREIGN KEY (livro_id) REFERENCES livro(id)
);