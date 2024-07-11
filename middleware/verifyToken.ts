import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Sessions from '../models/session';
import { keys } from '../config/config';
import Rols from '../models/rols';

const verifyToken = (rols: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idUsers = req.body['idAuth'];

        if (!idUsers) {
            return res.status(403).json({ message: 'No sea digitado ningun ID' });
        }

        const getToken = await Sessions.findOne({ where: { idUsers, status: 1 } });

        if (!getToken) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        const token = getToken.getDataValue('token');

        jwt.verify(token, keys.key, async (err:any, decoded:any) => {
            if (err) {
                return res.status(401).json({ message: 'Token no válido' });
            } else {
                req.body = decoded as JwtPayload;

                const rol = await Rols.findByPk(req.body.rol);
                if (rols.includes(rol?.getDataValue('rol'))) {
                    next();
                } else {
                    return res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
                }
            }
        });
    } catch (err) {
        return res.status(500).json({ message: `Error en el servidor: ${(err as Error).message}` });
    }
};

export default verifyToken;
