import { Router } from "express";
import { deleteUser, getUser, getUsers, patchUser, postUser } from "../controllers/users";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";


const router = Router();

router.get('/',
    [
        verifyToken(['admin']),
    ],
    getUsers);

router.get('/:id',
    [
        verifyToken(['admin']),
    ],
    getUser);

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

router.patch('/:id',
    [
        verifyToken(['admin']),
        check('idAuth', 'no sea encontrado usuario').isEmpty(),
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('lastName', 'El apellido es obligatorio').notEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('email', 'El email es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('password', 'La contraseña debe tener al menos 6 o máximo 8 caracteres').isLength({ min: 6, max: 8 }),
        check('rol', 'El rol es obligatorio').notEmpty()
    ],
    patchUser);

router.delete('/:id',
    [
        verifyToken(['admin']),
    ],
    deleteUser);



export default router;