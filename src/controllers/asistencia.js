import { query, response } from "express";
import { connect } from "../database";
var crypto = require("crypto");

export const checkCredentials = async (req, res, next) => {
  // Primero capturamos los campos y nos aseguramos que tengan algún dato
  const username = req.body.nombre_usuario;
  const password = req.body.password;

  if (username && password) {
    try {
      const connection = await connect();

      // Hasheamos la contraseña con SHA256
      const hash = crypto.createHash("sha256").update(password).digest("hex");

      // Comprobamos si intenta registrar asistencia un alumno o un profesor
      const [rowsA] = await connection.query(
        "SELECT COUNT(*) FROM ALUMNO WHERE nombre_usuario = ? and password = ?",
        [username, hash]
      );

      const [rowsP] = await connection.query(
        "SELECT COUNT(*) FROM PROFESOR WHERE nombre_usuario = ? and password = ?",
        [username, hash]
      );

      if (rowsA[0]["COUNT(*)"] == 1) {
        // Creedenciales correctas de alumno
        res.redirect(
          307,
          `/asistencia/alumno/${req.params.idClase}/${username}`
        );
      } else if (rowsP[0]["COUNT(*)"] == 1) {
        // Credenciales correctas de profesor
        res.redirect(
          307,
          `/asistencia/profesor/${req.params.idClase}/${username}`
        );
      } else {
        res.send("Usuario y/o contraseña incorrecto");
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.send("Por favor, introduzca su nombre de usuario y contraseña");
    res.end();
  }
};

export const saveAsistenciaAlumno = async (req, res, next) => {
  try {
    // Recuperamos el DNI del alumno
    const connection = await connect();

    const [rows] = await connection.query(
      "SELECT DNI FROM ALUMNO WHERE nombre_usuario = ?",
      [req.params.estudianteUsername]
    );

    // Registramos la asistencia del alumno en la clase que nos pasan
    const result = await connection.query(
      "INSERT INTO alumno_clase (ID, DNI) VALUES (?, ?)",
      [req.params.idClase, rows[0]["DNI"]]
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const saveAsistenciaProfesor = async (req, res, next) => {
  try {
    const connection = await connect();

    // Registramos la asistencia del profesor en la clase que nos pasan
    const result = await connection.query(
      "UPDATE CLASE SET asistencia=1 WHERE id=?;",
      [req.params.idClase]
    );

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
