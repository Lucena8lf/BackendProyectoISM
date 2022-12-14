import { response } from "express";
import { connect } from "../database";
import moment from "moment";

export const getAsignaturas = async (req, res, next) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT * FROM ASIGNATURA WHERE grado = ?",
      [req.params.codigoGrado]
    );

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getGrados = async (req, res, next) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM GRADO");

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getAulaDia = async (req, res, next) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      // al.id
      "SELECT al.nombre as aula, ag.nombre as asignatura, ag.grado, cl.hora_inicio, cl.hora_fin FROM CLASE cl, AULA al, ASIGNATURA ag WHERE (cl.fecha = ? and al.id = ? and cl.codigo_aula = al.id and ag.codigo = cl.codigo_asignatura)",
      [req.params.fecha, req.params.idAula]
    );

    if (rows) {
      res.json(rows);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

export const getAulaRango = async (req, res, next) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT al.nombre as aula, ag.nombre as asignatura, ag.grado, cl.fecha, cl.hora_inicio, cl.hora_fin FROM CLASE cl, AULA al, ASIGNATURA ag WHERE (cl.fecha >= ? and cl.fecha <= ? and al.id = ? and cl.codigo_aula = al.id and ag.codigo = cl.codigo_asignatura) order by fecha",
      [req.params.fechaInicio, req.params.fechaFin, req.params.idAula]
    );

    if (rows) {
      // Formateamos la fecha para no tenerla en formato ISO-8601
      /*
      var aulas = rows.map((row) => {
        var obj = { fecha: moment(row["fecha"]).format("MM/DD/YYYY"), ...row };
        return obj;
      });*/
      rows.forEach((row) => {
        row["fecha"] = moment(row["fecha"]).format("MM/DD/YYYY");
      });

      // Por último lo agrupamos por fechas
      var groupRows = groupBy(rows, "fecha");

      res.json(groupRows);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

export const getAulaAsignatura = async (req, res, next) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT al.nombre as aula, al.edificio, cl.fecha, cl.hora_inicio, cl.hora_fin FROM ASIGNATURA ag, AULA al, CLASE cl WHERE ag.nombre= ? and al.id = ? and cl.fecha >= ? and cl.fecha <= ? and ag.codigo = cl.codigo_asignatura and cl.codigo_aula = al.id",
      [
        req.params.asignatura,
        req.params.idAula,
        req.params.fechaInicio,
        req.params.fechaFin,
      ]
    );

    if (rows) {
      rows.forEach((row) => {
        row["fecha"] = moment(row["fecha"]).format("MM/DD/YYYY");
      });
      res.json(rows);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

/* Funcion para agrupar un array */
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
