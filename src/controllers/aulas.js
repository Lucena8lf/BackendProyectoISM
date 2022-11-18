import { response } from 'express';
import {connect} from '../database'

export const getAulaDia = async (req, res, next) => {

    try {
        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT a.nombre FROM clase c, aula a WHERE (c.fecha = ? and c.codigo_aula = a.id)", [
            req.params.fecha
        ]);
        
        if (rows) {
            var aulas = rows.map((row) => {
                var obj;
                obj = row["nombre"];
                return obj;
            })

            res.json(aulas);
        
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
            "SELECT a.nombre FROM clase c, aula a WHERE (c.fecha >= ? and c.fecha <= ? and c.codigo_aula = a.id)", [
            req.params.fechaInicio,
            req.params.fechaFin
        ]);

        if (rows){
            var aulas = rows.map((row) => {
                var obj;
                obj = row["nombre"];
                return obj;
            })

            // Eliminamos repetidos si los hubiera
            aulas = [...new Set(aulas)];

            res.json(aulas);
            
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
            "SELECT al.nombre FROM asignatura ag, aula al, clase cl WHERE ag.nombre=? and cl.fecha >= ? and cl.fecha <= ? and ag.codigo = cl.codigo_asignatura and cl.codigo_aula = al.id;", [
            req.params.asignatura,
            req.params.fechaInicio,
            req.params.fechaFin
        ]);

        if (rows){
            var aulas = rows.map((row) => {
                var obj;
                obj = row["nombre"];
                return obj;
            })

            aulas = [...new Set(aulas)];

            res.json(aulas);
            
        } else{
            res.status(404).end();
        }

    } catch (error){
        next(error);
    }
}