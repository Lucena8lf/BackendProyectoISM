import { response } from 'express';
import {connect} from '../database'

export const getAulaDia = async (req, res, next) => {

    try {
        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT al.nombre as aula, ag.nombre as asignatura, ag.grado, cl.hora_inicio, cl.hora_fin FROM CLASE cl, AULA al, ASIGNATURA ag WHERE (cl.fecha = ? and cl.codigo_aula = al.id and ag.codigo = cl.codigo_asignatura)", [
            req.params.fecha
        ]);

        if (rows){
            res.json(rows);
        } else {
            res.status(404).end();
        }

    } catch (error){
        next(error);
    }
    
}

export const getAulaRango = async(req, res, next) => {
    
    try {
        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT al.nombre as aula, ag.nombre as asignatura, ag.grado, cl.fecha, cl.hora_inicio, cl.hora_fin FROM CLASE cl, AULA al, ASIGNATURA ag WHERE (cl.fecha >= ? and cl.fecha <= ? and cl.codigo_aula = al.id and ag.codigo = cl.codigo_asignatura)", [
            req.params.fechaInicio,
            req.params.fechaFin
        ]);

        if (rows){
            res.json(rows);
        } else{
            res.status(404).end();
        }

    } catch (error){
        next(error);
    }
}

export const getAulaAsignatura = async(req, res, next) => {
    try {
        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT al.nombre as aula, al.edificio, cl.fecha, cl.hora_inicio, cl.hora_fin FROM ASIGNATURA ag, AULA al, CLASE cl WHERE ag.nombre= ? and cl.fecha >= ? and cl.fecha <= ? and ag.codigo = cl.codigo_asignatura and cl.codigo_aula = al.id", [
            req.params.asignatura,
            req.params.fechaInicio,
            req.params.fechaFin
        ]);

        if (rows){
            res.json(rows);            
        } else{
            res.status(404).end();
        }

    } catch (error){
        next(error);
    }
}