import {NextFunction, Request, Response} from "express";
import  prisma  from "../prisma"
import {HttpError} from "../middleware/errorHandler";

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: number = Number(req.params.postId)
        const { userId, content } = req.body;
        if (!content) {
            return next(new HttpError("Content is required!", 400));
        }
        const post = await prisma.post.findUnique({
            where:{id: postId}
        })
        if (!post) {
            return next(new HttpError(`Post with id ${postId} not found`, 404));
        }
        const newComment = await prisma.comment.create({
            data: {content, postId: post.id, userId}
        })
        return res.status(201).json({ id:newComment.id, content:newComment.content })
    } catch (error) {
        next(error);
    }
}

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: number = Number(req.params.postId);
        const post = await prisma.post.findUnique({
            where: {id: postId}
            }
        )
        if (!post) {
            return next(new HttpError(`Post with id ${postId} not found`, 404));
        }
        const comments = await prisma.comment.findMany({
            where: {postId: post.id}
        })
        return res.status(200).json(comments);
    } catch (error) {
        next(error)
    }
}

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId: number = Number(req.params.id);
        const { userId, userRole, content } = req.body;

        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return next(new HttpError(`Comment with id ${commentId} not found`, 404));
        }
        if ((comment.userId !== parseInt(userId)) && (userRole === "USER")) {
            return next(new HttpError('You do not have permission to update this comment', 403));
        }
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { content }
        });
        return res.status(200).json(updatedComment);
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId: number = Number(req.params.id);
        const { userId, userRole } = req.body;

        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return next(new HttpError(`Comment with id ${commentId} not found`, 404));
        }
        if ((comment.userId !== parseInt(userId)) && (userRole === "USER")) {
            return next(new HttpError('You do not have permission to update this comment', 403));
        }
        const deletedComment = await prisma.comment.delete({
            where: { id: commentId }
        });
        return res.status(204).json(deletedComment)
    } catch (error) {
        next(error)
    }
}
