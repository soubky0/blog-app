import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {JwtPayload} from "jsonwebtoken";
import { JWT_SECRET } from '../secrets';

export const jwtAuthentication = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing' });
    }
    try {
        const decode: JwtPayload = <JwtPayload> jwt.verify(token, JWT_SECRET);
        req.body.userId = decode["userId"]
        req.body.userRole = decode["userRole"]
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.clearCookie('token');
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};