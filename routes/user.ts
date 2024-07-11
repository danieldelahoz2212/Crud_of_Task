import { Router } from "express";
import { deleteUser, getUser, getUsers, patchUser, postUser } from "../controllers/users";
import { check } from "express-validator";
import verifyToken from "../controllers/jwt";


const router = Router();

//user
router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUser);
router.post('/', [
    check('email', 'El email no es valido').isEmail(),
], postUser);
router.patch('/:id',[
    check('email', 'El email no es valido').isEmail(),
], verifyToken, patchUser);
router.delete('/:id', verifyToken, deleteUser);

//task






export default router;