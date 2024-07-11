import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keys } from '../config/config';
import Sessions from '../models/session';

declare global {
    namespace Express {
        interface Request {
            id?: jwt.JwtPayload | string;
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idUsers = req.body['idAuth'];

        if (!idUsers) {
            return res.status(403).json({ message: 'Token no encontrado' });
        }

        const getToken = await Sessions.findOne({ where: { idUsers } })
        const decoded = jwt.verify(getToken?.getDataValue('token'), keys.key);

        if (!getToken) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        req.id = decoded;
        next();

    } catch (err) {
        return res.status(500).json({ message: `Error en el servidor ${err}` });
    }
};

export default verifyToken;

