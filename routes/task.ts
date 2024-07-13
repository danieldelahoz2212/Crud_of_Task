import { Router } from "express";
import { deleteTask, getTask, getTasks, patchTask, postTask } from "../controllers/tasks";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get('/',
    [

    ],
    getTasks);

router.get('/:id',
    [

    ],
    getTask);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),        
        check('description', 'La Descripcion es obligatorio').notEmpty(),
        check('category', 'La categoria es obligatorio').notEmpty(),
        check('idUser', 'El apellido es obligatorio').notEmpty()
    ],
    postTask);

router.patch('/:id',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),        
        check('description', 'La Descripcion es obligatorio').notEmpty(),
        check('category', 'La categoria es obligatorio').notEmpty(),
        check('idUser', 'El apellido es obligatorio').notEmpty()
    ],
    patchTask);

router.delete('/:id',
    [

    ],
    deleteTask);

export default router;