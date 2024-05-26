import {NextFunction, Request, Response} from "express";
import  prisma  from "../prisma"
import { HttpError} from "../middleware/errorHandler";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })
        if (user) {
            res.status(200).json({user: user})
        } else {
            return next(new HttpError(`User with id ${id} not found`, 404))
        }
    } catch (error) {
        next(error)
    }
}