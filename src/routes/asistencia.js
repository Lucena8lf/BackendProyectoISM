import { Router } from "express";
import { checkCredentials } from "../controllers/asistencia";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Asistencia
 *  description: Endpoints de la asistencia
 */

/**
 * @swagger
 * /asistencia/{idAula}:
 *  post:
 *      summary: Comprueba las credenciales del alumno o profesor antes de registrar la presencia
 *      parameters:
 *          - in: path
 *            name: idAula
 *            description: ID de la aula en la que quiere registrar la presencia el alumno o profesor
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Invalid id used
 *      tags: [Asistencia]
 */
router.post("/asistencia/:idAula", checkCredentials);

export default router;
