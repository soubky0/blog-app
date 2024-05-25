import { Request, Response } from "express";
import  prisma  from "../prisma"
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
    })
    res.status(200).json({user:user})
}