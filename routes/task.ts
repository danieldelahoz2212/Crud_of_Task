import { Router } from "express";
import { deleteTask, getTask, getTasks, patchTask, postTask } from "../controllers/tasks";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/task/:
 *   get:
 *     summary: Obtener lista de tareas
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - task
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.get('/',
    [
        verifyToken(['admin', 'user']),
    ],
    getTasks);

/**
* @swagger
* /api/task/{id}:
*   get:
*     summary: Obtener Tarea por id
*     security:
*       - apiAuth: []
*     tags:
*       - task
*     parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: ID de la Tarea
*     responses:
*       200:
*         description: tarea obtenida correctamente
*       401:
*         description: No tiene permisos para realizar esta acción
*       404:
*         description: No existe un tarea con el id
*/

router.get('/:id',
    [
        verifyToken(['admin', 'user']),
    ],
    getTask);

/**
 * @swagger
 * /api/task/:
 *   post:
 *     summary: Crear una nueva Tarea
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: titulo de la tarea
 *               description:
 *                 type: string
 *                 description: descripcion de la tarea
 *               categoy:
 *                 type: number
 *                 description: categoria de la tarea
 *               idUser:
 *                 type: number
 *                 description: id del usuario asignado
 *               idStatus:
 *                 type: number
 *                 description: id del estado de tarea
 *     responses:
 *       200:
 *         description: Tarea creada con éxito
 *       400:
 *         description: el usuario con el id no exite
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.post('/',
    [
        verifyToken(['admin']),
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('description', 'La Descripcion es obligatorio').notEmpty(),
        check('category', 'La categoria es obligatorio').notEmpty(),
        check('idUser', 'El apellido es obligatorio').notEmpty(),
        check('idStatus', 'EL estado de la tarea es obligatorio').notEmpty()
    ],
    postTask);

/**
* @swagger
* /api/task/{id}:
*   patch:
*     summary: Actualizar una Tarea
*     security:
*       - apiAuth: []
*     tags:
*       - task
*     parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: ID de la Tarea
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 description: titulo de la tarea
*               description:
*                 type: string
*                 description: descripcion de la tarea
*               categoy:
*                 type: number
*                 description: categoria de la tarea
*               idUser:
*                 type: number
*                 description: id del usuario asignado
*               idStatus:
*                 type: number
*                 description: id del estado de tarea
*     responses:
*       200:
*         description: Tarea Actualizada con éxito
*       400:
*         description: La tarea no existe
*       401:
*         description: No tiene permisos para realizar esta acción
*/

router.patch('/:id',
    [
        verifyToken(['admin', 'user']),
    ],
    patchTask);

/**
* @swagger
* /api/task/{id}:
*   delete:
*     summary: Eliminar Tarea por el ID
*     security:
*       - apiAuth: []
*     tags:
*       - task
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: ID de Category
*     responses:
*       200:
*         description: Tarea eliminar con éxito
*       400:
*         description: La tarea no existe
*       401:
*         description: No tiene permisos para realizar esta acción
*/

router.delete('/:id',
    [
        verifyToken(['admin']),
    ],
    deleteTask);

export default router;