import { Request, Response } from "express";
import  prisma  from "../prisma"

export const createComment = async (req: Request, res: Response) => {
    const postId: number = Number(req.params.postId)
    const { userId, content } = req.body;
    if (!content) {
        return res.status(400).json({error: "Content is required!"})
    }
    try {
        const post = await prisma.post.findUnique({
            where:{id: postId}
        })
        if (!post) {
            return res.status(404).json({error: `Post with id ${postId} not found`})
        }
        const newComment = await prisma.comment.create({
            data: {content, postId: post.id, userId}
        })
        return res.status(201).json({ content:newComment.content })
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const postId: number = Number(req.params.postId);
        const post = await prisma.post.findUnique({
            where: {id: postId}
            }
        )
        if (!post) {
            return res.status(404).json({error: `Post with id ${postId} not found`})
        }
        const comments = await prisma.comment.findMany({
            where: {postId: post.id}
        })
        return res.status(200).json(comments);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const commentId: number = Number(req.params.id);
        const { userId, userRole, content } = req.body;

        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).json({ error: `Comment with id ${commentId} not found` });
        }
        if ((comment.userId !== parseInt(userId)) && (userRole === "USER")) {
            return res.status(403).json({ error: 'You do not have permission to update this post' });
        }
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { content }
        });
        return res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error)
        return res.status(500).json(error);
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const commentId: number = Number(req.params.id);
        const { userId, userRole } = req.body;

        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).json({ error: `Comment with id ${commentId} not found` });
        }
        if ((comment.userId !== parseInt(userId)) && (userRole === "USER")) {
            return res.status(403).json({ error: 'You do not have permission to delete this post' });
        }
        const deletedPost = await prisma.comment.delete({
            where: { id: commentId }
        });
        return res.status(204)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error);
    }
}
