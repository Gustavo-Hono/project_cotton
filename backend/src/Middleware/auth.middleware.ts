import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function checkPermission(cargosPermitidos: string[]) {

    return (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Acesso negado. Token nao fornecido." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token em formato inválido." });
        }

        try {
            const payload = jwt.verify(token, JWT_SECRET) as { cargo: string; [key: string]: any };
            
            if (cargosPermitidos.includes(payload.cargo)) {
                
                // @ts-ignore
                req.usuario = payload;

                next();
            } else {
                return res.status(403).json({ message: "Acesso proibido. Permissões insuficientes." });
            }
        } catch (error) {
            return res.status(401).json({ message: "Token inválido ou expirado." });
        }
    };
}