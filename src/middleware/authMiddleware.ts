import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

//Modulo creado para  que el middleware tenga acceso al usuario
declare module 'express-serve-static-core'{
    interface Request {
        user?: any;
    }
}
const secretkey = process.env.JWT_SECRET_KEY || "123456789";

//Verificacion del token
const verifyKey = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            message: "Denied access"
        });
    }
    try {
        const verified = jwt.verify(token, secretkey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid token"
        }); 
    }
}

export default verifyKey;