import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Sessions from '../models/sessions';
import Rols from '../models/rols';

const verifyToken = (rols: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idUsers = req.body['idAuth'];

        if (!idUsers) {
            return res.status(403).json({ message: 'No se ha digitado ningún ID' });
        }

        const getToken = await Sessions.findOne({ where: { idUsers, status: 1 } });

        if (!getToken) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        const token = getToken.getDataValue('token');

        jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Token no válido' });
            }

            req.body.decoded = decoded as JwtPayload;
//
            const rol = await Rols.findByPk(req.body.rol);
            if (!rol) {
                return res.status(403).json({ message: 'Rol no encontrado' });
            }

            if (rols.includes(rol.getDataValue('rol'))) {
                next();
            } else {
                return res.status(403).json({ message: 'No tiene permisos para realizar esta acción' });
            }
        });
    } catch (err) {
        return res.status(500).json({ message: `Error en el servidor: ${(err as Error).message}` });
    }
};

export default verifyToken;
