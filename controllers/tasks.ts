import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Tasks from "../models/tasks";
import Users from "../models/users";
import Rols from "../models/rols";
import Status from "../models/Status";

export const getTasks = async (req: Request, res: Response) => {

    const tasks = await Tasks.findAll();

    res.json({ tasks });
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const task = await Tasks.findByPk(id);
        if (task) {
            res.json({ task });
        }else{
            res.status(404).json({ msg: `No existe un tarea con el id ${id}` });
        }

    } catch (error) {
        console.error(error);
    }
}

export const postTask = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { title, description, category, idUser, idStatus } = req.body
        const user = await Users.findByPk(idUser);
        if (!user) {
            return res.status(400).json({ messege: `el usuario con el id: ${idUser} no existe` })
        }
        const task = await Tasks.create({ title, description, category, idUser, idStatus });

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
        const { title, description, category, idUser, idStatus } = req.body;

        const task = await Tasks.findByPk(id);
        if (!task) {
            return res.status(400).json({ message: 'La tarea no existe' });
        }

        const user = await Users.findByPk(idUser);
        if (!user) {
            return res.status(400).json({ message: `el usuario con el id: ${idUser} no existe` });
        }

        const rols = await Rols.findByPk(user.getDataValue('rol'));
        if (rols?.getDataValue('rol') == 'admin') {
            await task.update({ title, description, category, idUser, idStatus });
        } else {
            await task.update({ idStatus });
        }

        res.json({
            message: 'Tarea creada con éxito',
            task
        })

    } catch (error) {
        console.error(error);
    }
}

// export const patchTaskStatus = async (req: Request, res: Response) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json(errors);
//         }

//         const { id } = req.params;
//         const { idStatus } = req.body;

//         const task = await Tasks.findByPk(id);
//         if (!task) {
//             return res.status(400).json({ message: 'La tarea no existe' });
//         }

//         await task.update({ idStatus });

//         res.json({
//             message: 'Tarea creada con éxito',
//             task
//         })

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: `Error del servidor ${error}` });
//     }
// }

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await Tasks.findByPk(id);

    if (!task) {
        return res.status(400).json({ message: 'La tarea no existe' })
    }

    await task.update({ status: false });

    res.json({
        message: 'Tarea eliminar con éxito',
        task
    });
}