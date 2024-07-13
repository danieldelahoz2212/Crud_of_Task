import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Tasks from "../models/tasks";
import Users from "../models/users";

export const getTasks = async (req: Request, res: Response) => {

    const tasks = await Tasks.findAll();

    res.json({ tasks });
}

export const getTask = async (req: Request, res: Response) => {

    const { id } = req.params;

    const task = await Tasks.findByPk(id);

    res.json({ task });
}

export const postTask = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { title, description, category, idUser } = req.body
        const user = await Users.findByPk(idUser);
        if (!user) {
            return res.status(400).json({ messege: `el usuario con el id: ${idUser} no existe` })
        }
        const task = await Tasks.create({ title, description, category, idUser });

        res.json({
            message: 'Tarea creada con éxito',
            task
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error del servidor ${error}` });
    }
}

export const patchTask = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        const { title, description, category, idUser } = req.body;

        const task = await Tasks.findByPk(id);
        if (!task) {
            return res.status(400).json({ message: 'La tarea no existe' });
        }

        await task.update({ title, description, category, idUser });

        res.json({
            message: 'Tarea creada con éxito',
            task
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error del servidor ${error}` });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Tasks.findByPk(id);

    if(!task){
        return res.status(400).json({message: 'La tarea no existe' })
    }

    await task.update({status:false});

    res.json({
        message: 'Tarea eliminar con éxito',
        task
    });
}