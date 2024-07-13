import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Categorys from "../models/categorys";

export const getCategorys = async (req: Request, res: Response) => {

    const categorys = await Categorys.findAll();

    res.json({ categorys });
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Categorys.findByPk(id);

    res.json({ category });
}

export const postCategory = async (req: Request, res: Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { name, description } = req.body;

        const existeCategory = await Categorys.findOne({ where: { name } });
        if (existeCategory) {
            return res.status(400).json({ message: 'Esta categoria ya está registrado' });
        }

        const category = await Categorys.create({ name, description });

        res.json({
            message: 'Categoria creada con éxito',
            category
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error del servidor ${error}` });
    }
}

export const patchCategory = async (req: Request, res: Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Categorys.findByPk(id);
        if(!category){
            return res.status(400).json({message: 'La categoria no existe'});
        }

        await category.update({ name, description });

        res.json({
            message: 'Categoria actualizada con éxito',
            category
        })
    }catch(error){
        console.error(error);
        res.status(500).json({ message: `Error del servidor ${error}`});
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Categorys.findByPk(id);

    if (!category) {
        return res.status(400).json({ message: 'No existe la categoria' });
    }

    await category.update({ status: false });

    res.json({
        message: 'Categoria eliminada con éxito',
        category
    });
}