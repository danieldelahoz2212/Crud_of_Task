import { Router } from "express";
import { deleteTask, getTask, getTasks, patchTask, postTask } from "../controllers/tasks";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get('/',
    [
        verifyToken(['admin', 'user']),
    ],
    getTasks);

router.get('/:id',
    [
        verifyToken(['admin', 'user']),
    ],
    getTask);

router.post('/',
    [
        verifyToken(['admin']),
        check('title', 'El titulo es obligatorio').notEmpty(),        
        check('description', 'La Descripcion es obligatorio').notEmpty(),
        check('category', 'La categoria es obligatorio').notEmpty(),
        check('idUser', 'El apellido es obligatorio').notEmpty(),
        check('idStatus','EL estado de la tarea es obligatorio').notEmpty()
    ],
    postTask);

router.patch('/:id',
    [
        verifyToken(['admin','user']),
        check('title', 'El titulo es obligatorio').notEmpty(),        
        check('description', 'La Descripcion es obligatorio').notEmpty(),
        check('category', 'La categoria es obligatorio').notEmpty(),
        check('idUser', 'El apellido es obligatorio').notEmpty(),
        check('idStatus','EL estado de la tarea es obligatorio').notEmpty()
    ],
    patchTask);

router.delete('/:id',
    [
        verifyToken(['admin']),
    ],
    deleteTask);

export default router;