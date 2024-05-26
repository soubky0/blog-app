import {NextFunction, Request, Response} from "express";
import  prisma  from "../prisma"
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        })
        res.status(200).json({user:user})
    } catch (error) {
        next(error)
    }
}