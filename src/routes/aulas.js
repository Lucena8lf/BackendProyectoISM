import { Router } from "express";
import {
  getGrados,
  getAsignaturas,
  getAulaDia,
  getAulaRango,
  getAulaAsignatura,
} from "../controllers/aulas";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Aulas
 *  description: Endpoints de las aulas
 */

/**
 * @swagger
 * /grados:
 *  get:
 *      summary: Obtiene todos los grados disponibles
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: SQL Error
 *      tags: [Aulas]
 */
router.get("/grados", getGrados);

/**
 * @swagger
 * /{codigoGrado}/asignaturas:
 *  get:
 *      summary: Obtiene todas las asignaturas de un determinado grado
 *      parameters:
 *          - in: path
 *            name: codigoGrado
 *            description: Código del grado que se quieren obtener las asignaturas
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid code used
 *      tags: [Aulas]
 */
router.get("/:codigoGrado/asignaturas", getAsignaturas);

/**
 * @swagger
 * /aulas/{idAula}/{fecha}:
 *  get:
 *      summary: Obtiene las clases de aula indicándole un día específico
 *      parameters:
 *          - in: path
 *            name: idAula
 *            description: ID del aula del que se quieren consultar las clases
 *          - in: path
 *            name: fecha
 *            description: Fecha específica en la que se quiere consultar las clases
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid date used
 *      tags: [Aulas]
 */
router.get("/aulas/:idAula/:fecha", getAulaDia);

/**
 * @swagger
 * /aulas/{idAula}/{fechaInicio}/{fechaFin}:
 *  get:
 *      summary: Obtiene las aulas reservadas indicándole un rango de fechas
 *      parameters:
 *          - in: path
 *            name: idAula
 *            description: ID del aula del que se quieren consultar las clases
 *          - in: path
 *            name: fechaInicio
 *            description: Fecha de inicio del rango
 *          - in: path
 *            name: fechaFin
 *            description: Fecha final del rango
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid date used
 *      tags: [Aulas]
 */
router.get("/aulas/:idAula/:fechaInicio/:fechaFin", getAulaRango);

/**
 * @swagger
 * /aulas/asignaturas/{asignatura}/{fechaInicio}/{fechaFin}:
 *  get:
 *      summary: Obtiene las aulas reservadas indicándole una asignatura en un rango de fechas determinado
 *      parameters:
 *          - in: path
 *            name: asignatura
 *            description: Asignatura para la que han sido reservadas esas clases
 *          - in: path
 *            name: fechaInicio
 *            description: Fecha de inicio del rango
 *          - in: path
 *            name: fechaFin
 *            description: Fecha final del rango
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid subject/date used
 *      tags: [Aulas]
 */
router.get(
  "/aulas/asignaturas/:asignatura/:fechaInicio/:fechaFin",
  getAulaAsignatura
);

export default router;
