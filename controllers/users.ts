import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Users from "../models/users";
import Sessions from "../models/sessions";
import jwt from 'jsonwebtoken';
import { encrypt } from "./auth";
import { compare } from "bcrypt";


export const getUsers = async (req: Request, res: Response) => {

    const users = await Users.findAll();

    res.json({
        messege: 'Lista de usuarios obtenida correctamente',
        users
    })
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await Users.findByPk(id);

        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ message: `No existe un usuario con el id ${id}` })
        }
    } catch (error) {
        console.error(error);
    }
};

export const postUser = async (req: Request, res: Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { name, lastName, email, password, rol } = req.body;

        const existeEmail = await Users.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(400).json({ message: 'Este correo ya está registrado' });
        }

        const passwordHash = await encrypt(password);

        const user = await Users.create({ name, lastName, email, password: passwordHash, rol });

        console.log(user)

        const token = jwt.sign({ Id: user.getDataValue('id'), rol: user.getDataValue('rol') }, process.env.JWT_SECRET as string);

        await Sessions.create({ token, idUsers: user.getDataValue('id') })

        res.json({
            message: 'Usuario creado con éxito',
            user,
            token
        });

    } catch (error) {
        console.error(error);
    }
};

export const patchUser = async (req: Request, res: Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { id } = req.params;
        const { name, lastName, email, password, rol } = req.body;

        const user = await Users.findByPk(id);

        if (!user) {
            return res.status(400).json({ message: 'No existe un usuario con el id ' + id });
        }

        const session = await Sessions.findOne({ where: { idUsers: user.getDataValue('id') } });

        const token = jwt.sign({ Id: user.getDataValue('id'), rol: user.getDataValue('rol') }, process.env.JWT_SECRET as string);

        await session?.update({ token });

        await user.update({ name, lastName, email, password, rol });

        res.json({
            message: 'Usuario Actualizado con éxito',
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error del servidor ${error}` });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) {
        return res.status(400).json({ message: `No existe un usuario con el id: ${id}` });
    }

    await user.update({ status: false });

    res.json({
        message: 'El Usuario fue eliminado con éxito',
        user
    })
};

export const login = async (req: Request, res: Response) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const checkPassword = await compare(password, user.getDataValue('password'));

        const session = await Sessions.findOne({ where: { idUsers: user?.getDataValue('id') } });

        if (!session) {
            return res.status(402).json({ message: 'no se encontro el token' });
        }

        if (checkPassword) {
            res.json({
                message: 'Usuario logueado con éxito',
                user,
                token: session.getDataValue('token')

            });
        }
    } catch (error) {
        console.error(error);
    }
};