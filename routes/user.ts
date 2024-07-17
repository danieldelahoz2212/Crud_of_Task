import { Router } from "express";
import { deleteUser, getUser, getUsers, patchUser, postUser, login } from "../controllers/users";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";


const router = Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Obtener lista de Usuarios
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.get('/',
    [
        verifyToken(['admin']),
    ],
    getUsers);

/**
* @swagger
* /api/users/{id}:
*   get:
*     summary: Obtener usuario por ID
*     security:
*       - apiAuth: []
*     tags:
*       - user
*     parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: ID del usuario
*     responses:
*       200:
*         description: Lista de usuarios obtenida correctamente
*       401:
*         description: No tiene permisos para realizar esta acción
*       404:
*         description: No existe un usuario con el id
*/

router.get('/:id',
    [
        verifyToken(['admin']),
    ],
    getUser);

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Crear un nuevo usuario
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               rol:
 *                 type: number
 *                 description: Rol del usuario
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Este correo ya está registrado
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.post('/',
    [
        verifyToken(['admin']),
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('lastName', 'El apellido es obligatorio').notEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('email', 'El email es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('password', 'La contraseña debe tener al menos 6 o máximo 8 caracteres').isLength({ min: 6, max: 8 }),
        check('rol', 'El rol es obligatorio').notEmpty()
    ],
    postUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar usuario por ID
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               rol:
 *                 type: number
 *                 description: Rol del usuario
 *     responses:
 *       200:
 *         description: Usuario Actualizado con éxito
 *       400:
 *         description: No existe un usuario con el id
 *       401:
 *         description: No tiene permisos para realizar esta acción
 */

router.patch('/:id',
    [
        verifyToken(['admin'])
    ],
    patchUser);

/**
* @swagger
* /api/users/{id}:
*   delete:
*     summary: Eliminar usuario por el ID
*     security:
*       - apiAuth: []
*     tags:
*       - user
*     parameters:
*      - in: path
*        name: id
*        schema:
*          type: number
*        required: true
*        description: ID del usuario
*     responses:
*       200:
*         description: El Usuario fue eliminado con éxito
*       400:
*         description: No existe un usuario con el id 
*       401:
*         description: No tiene permisos para realizar esta acción
*/

router.delete('/:id',
    [
        verifyToken(['admin'])
    ],
    deleteUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: inisio de sesion con email y password
 *     security:
 *       - apiAuth: []
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario logueado con éxito
 *       400:
 *         description: Usuario o contraseña incorrectos
 *       402:
 *         description: no se encontro el token
 */

router.post('/login',
    [
        check('email', 'El email no es válido').isEmail(),
        check('email', 'El email es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('password', 'La contraseña debe tener al menos 6 o máximo 8 caracteres').isLength({ min: 6, max: 8 })
    ],
    login);


export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     apiAuth:
 *       type: apiKey
 *       in: header
 *       name: token
 */