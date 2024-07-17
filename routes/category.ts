import { Router } from "express";
import { deleteCategory, getCategory, getCategorys, patchCategory, postCategory } from "../controllers/category";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/category/:
 *   get:
 *     summary: Obtener lista de Categorias
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - category
 *     responses:
 *       200:
 *         description: Lista de Categorias obtenida correctamente
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.get('/',
    [
        verifyToken(['admin', 'user']),
    ],
    getCategorys);

/**
* @swagger
* /api/category/{id}:
*   get:
*     summary: Obtener Categoria por ID
*     security:
*       - apiAuth: []
*     tags:
*       - category
*     parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: ID del usuario
*     responses:
*       200:
*         description: Categoria obtenida correctamente
*       401:
*         description: No tiene permisos para realizar esta acción
*       404:
*         description: No existe una categoria con el id
*/

router.get('/:id',
    [
        verifyToken(['admin', 'user']),
    ],
    getCategory);

/**
 * @swagger
 * /api/category/:
 *   post:
 *     summary: Crear un nuevo Categoria
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la Categoria
 *               description:
 *                 type: string
 *                 description: Descripcion de la categoria
 *     responses:
 *       200:
 *         description: Categoria creada correctamente
 *       400:
 *         description: Esta categoria ya está registrado
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.post('/',
    [
        verifyToken(['admin']),
        check('name', 'El nombre de la categoria es obligatorio').notEmpty(),
        check('description', 'La descripcion de la categoria es obligatoria').notEmpty()
    ],
    postCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Actualizar Categoria por ID
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la Categoria
 *               description:
 *                 type: string
 *                 description: Descripcion de la categoria
 *     responses:
 *       200:
 *         description: Categoria actualizada con éxito
 *       400:
 *         description: La categoria no existe
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.patch('/:id',
    [
        verifyToken(['admin']),
    ],
    patchCategory);

/**
* @swagger
* /api/category/{id}:
*   delete:
*     summary: Eliminar Categoria por el ID
*     security:
*       - apiAuth: []
*     tags:
*       - category
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: number
*         required: true
*         description: ID de Category
*     responses:
*       200:
*         description: Categoria eliminada con éxito
*       400:
*         description: No existe una categoria con el id
*       401:
*         description: No tiene permisos para realizar esta acción
*/

router.delete('/:id',
    [
        verifyToken(['admin']),
    ],
    deleteCategory);

export default router;