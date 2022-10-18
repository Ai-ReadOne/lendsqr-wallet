import { request, response, NextFunction} from 'express';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

const jwt = jsonwebtoken;
dotenv.config({path: '../.env'});

export function CreateAuthToken(id: string, email: string, is_admin: boolean): string{
    return jwt.sign({'id': id, 'email': email, 'is_admin': is_admin}, process.env.AUTH_SECRET as string )
}

export const VerifyAuthTokenMiddleware = (req: typeof request, res: typeof response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({error: "user is unauthorized"});
    } else {
        jwt.verify(token, process.env.AUTH_SECRET as string, (err) => {
            if (err){
                res.status(401).json({error: "error while authenticating user"});
            }

            next();
        })
    }
}