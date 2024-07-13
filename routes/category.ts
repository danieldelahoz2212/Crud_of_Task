import { Router } from "express";
import { deleteCategory, getCategory, getCategorys, patchCategory, postCategory } from "../controllers/category";
import { check } from "express-validator";

const router = Router();

router.get('/',
    [

    ],
    getCategorys);

router.get('/:id',
    [

    ],
    getCategory);

router.post('/',
    [
        check('name', 'El nombre de la categoria es obligatorio').notEmpty(),
        check('description', 'La descripcion de la categoria es obligatoria').notEmpty()
    ],
    postCategory);

router.patch('/:id',
    [
        check('name', 'El nombre de la categoria es obligatorio').notEmpty(),
        check('description', 'La descripcion de la categoria es obligatoria').notEmpty()
    ],
    patchCategory);


router.delete('/:id',
    [

    ],
    deleteCategory);

export default router;