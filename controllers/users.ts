import { Request, Response } from "express"
import Users from "../models/user"

export const getUsers = async (req: Request, res: Response) => {

    const users = await Users.findAll();

    res.json({ users })
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const {id}  = req.params;
        const user = await Users.findByPk(id);

        if(user){
            res.json({user});
        }else{
            res.status(404).json({message: `No existe un usuario con el id ${id}` })
        }
    } catch (error) {
        console.error(error);
    }
};

export const postUser = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'postUser',
        body
    })
}

export const patchUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'patchUser',
        body,
        id
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'deleteUser',
        id
    })
}