CREATE DATABASE database_enlace;

USE database_enlace;
--tabla de usuarios

CREATE TABLE usuarios(
  id INT(11) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  clave VARCHAR(60) NOT NULL,
  nombre VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE usuarios;

--tabla de enlaces
CREATE TABLE enlaces(
  id INT(11) NOT NULL,
  titulo VARCHAR(16) NOT NULL,
  url VARCHAR(60) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  usuario_id INT(11),
  creado timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

ALTER TABLE enlaces
  ADD PRIMARY KEY (id);

ALTER TABLE enlaces
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;