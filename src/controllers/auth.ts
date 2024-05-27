import {Request, Response, NextFunction} from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../secrets";
import {HttpError} from "../middleware/errorHandler";
import {logger} from "../logger";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    if (!username) {
        return next(new HttpError("Username is required!", 400));
    } else if (!email) {
        return next(new HttpError("Email is required!", 400));
    } else if (!password) {
        return next(new HttpError("Password is required!", 400));
    } else {
        try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }]}});

            if (existingUser) {
                return next(new HttpError("User already exists!", 400));
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: { username, email, password: hashedPassword },
            });
            res.status(201).json({ id: user.id, username: user.username, email: user.email });
        } catch (error) {
            next(error)
        }
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email) {
        return next(new HttpError('Email is required!', 400))
    } else if (!password) {
        return next(new HttpError('Password is required!', 400))
    } else {
        try {
            const user = await prisma.user.findUnique({
                where: {email},
            })
            if (!user)
                return next(new HttpError('Email is not registered!', 401))
            const isAuthenticated = await bcrypt.compare(password, user.password)
            if (!isAuthenticated)
                return next(new HttpError('Wrong password!', 401))
            const token = jwt.sign({ userId: user.id, userRole: user.role }, JWT_SECRET, {expiresIn: '15m'});
            res = res.cookie('token', token);
            logger.info(`User ${user.username} Login`)
            return res.status(200).json({token})
        } catch (error) {
            next(error)
        }
    }
}