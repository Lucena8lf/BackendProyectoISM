import { Router } from "express";
import {
  checkCredentials,
  saveAsistenciaAlumno,
  saveAsistenciaProfesor,
} from "../controllers/asistencia";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Asistencia
 *  description: Endpoints de la asistencia
 */

/**
 * @swagger
 * /asistencia/{idClase}:
 *  post:
 *      summary: Comprueba las credenciales del alumno o profesor antes de registrar la presencia
 *      parameters:
 *          - in: path
 *            name: idClase
 *            description: ID de la clase en la que quiere registrar la presencia el alumno o profesor
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid id used
 *      tags: [Asistencia]
 */
router.post("/asistencia/:idClase", checkCredentials);

/**
 * @swagger
 * /asistencia/alumno/{idClase}/{estudianteUsername}:
 *  post:
 *      summary: Registra la asistencia de un alumno en una clase determinada
 *      parameters:
 *          - in: path
 *            name: idClase
 *            description: ID de la clase en la que quiere registrar la presencia el alumno
 *          - in: path
 *            name: studentUsername
 *            description: Nombre de usuario del alumno que quiere registrar la presencia
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Trigger error
 *      tags: [Asistencia]
 */
router.post(
  "/asistencia/alumno/:idClase/:estudianteUsername",
  saveAsistenciaAlumno
);

/**
 * @swagger
 * /asistencia/profesor/{idClase}/{profesorUsername}:
 *  post:
 *      summary: Registra la asistencia de un profesor en una clase determinada
 *      parameters:
 *          - in: path
 *            name: idClase
 *            description: ID de la clase en la que quiere registrar la presencia el profesor
 *          - in: path
 *            name: professorUsername
 *            description: Nombre de usuario del profesor que quiere registrar la presencia
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Trigger error
 *      tags: [Asistencia]
 */
router.post(
  "/asistencia/profesor/:idClase/:profesorUsername",
  saveAsistenciaProfesor
);

export default router;
