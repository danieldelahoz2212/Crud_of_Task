import { Router } from "express";
import { deleteUser, getUser, getUsers, patchUser, postUser } from "../controllers/users";


const router = Router();


router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);





export default router;