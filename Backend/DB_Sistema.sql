CREATE DATABASE `registro_estudiantes`

CREATE TABLE `Estudiantes` (
  `id_estudiante` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `ci` varchar(10) NOT NULL,
  `semestre` varchar(50) NOT NULL,
  PRIMARY KEY(id_estudiante)
);