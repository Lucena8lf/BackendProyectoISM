import {Router} from 'express';
import {getAulaDia, getAulaRango, getAulaAsignatura} from '../controllers/aulas'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Aulas
 *  description: Endpoints de las aulas
 */

/**
 * @swagger
 * /aulas/{fecha}:
 *  get:
 *      summary: Obtiene las aulas reservadas indicándole un día específico
 *      parameters:
 *          - in: path
 *            name: fecha
 *            description: Fecha específica en la que se quiere consultar las aulas
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid date used
 *      tags: [Aulas]
 */
router.get('/aulas/:fecha', getAulaDia)

/**
 * @swagger
 * /aulas/{fechaInicio}/{fechaFin}:
 *  get:
 *      summary: Obtiene las aulas reservadas indicándole un rango de fechas
 *      parameters:
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
router.get('/aulas/:fechaInicio/:fechaFin', getAulaRango)

/**
 * @swagger
 * /aulas/{asignatura}/{fechaInicio}/{fechaFin}:
 *  get:
 *      summary: Obtiene las aulas reservadas indicándole una asignatura en un rango de fechas determinado
 *      parameters:
 *          - in: path
 *            name: asignatura
 *            description: Asignatura para la que han sido reservadas esas aulas
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
router.get('/aulas/:asignatura/:fechaInicio/:fechaFin', getAulaAsignatura)

export default router