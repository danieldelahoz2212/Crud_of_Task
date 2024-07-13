import { Router } from "express";
import { deleteCategory, getCategory, getCategorys, patchCategory, postCategory } from "../controllers/category";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken";

const router = Router();

router.get('/',
    [
        verifyToken(['admin', 'user']),
    ],
    getCategorys);

router.get('/:id',
    [
        verifyToken(['admin', 'user']),
    ],
    getCategory);

router.post('/',
    [
        verifyToken(['admin']),
        check('name', 'El nombre de la categoria es obligatorio').notEmpty(),
        check('description', 'La descripcion de la categoria es obligatoria').notEmpty()
    ],
    postCategory);

router.patch('/:id',
    [
        verifyToken(['admin']),
        check('name', 'El nombre de la categoria es obligatorio').notEmpty(),
        check('description', 'La descripcion de la categoria es obligatoria').notEmpty()
    ],
    patchCategory);


router.delete('/:id',
    [
        verifyToken(['admin']),
    ],
    deleteCategory);

export default router;