import { Request, Response } from "express";
import  prisma  from "../prisma"

export const createPost = async (req: Request, res: Response) => {
    const { userId, title, content } = req.body;
    if (!title) {
        return res.status(400).json({error: "Title is required!"})
    }
    if (!content) {
        return res.status(400).json({error: "Content is required!"})
    }
    try {
        const newPost = await prisma.post.create({
            data: { userId, title, content }
        })
        return res.status(201).json({title:newPost.title, content:newPost.content})
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllPosts = async (req: Request, res: Response) => {
    try{
        const posts = await prisma.post.findMany();
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const postId: number = Number(req.params.id);
        const post = await prisma.post.findUnique({
            where: {id: postId}
            }
        )
        if (!post) {
            return res.status(404).json({error: `Post with id ${postId} not found`})
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updatePost = async (req: Request, res: Response) => {
    try {
        const postId: number = Number(req.params.id);
        const { userId, userRole, title, content } = req.body;

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: `Post with id ${postId} not found` });
        }
        if ((post.userId !== parseInt(userId)) && (userRole === "USER")) {
            return res.status(403).json({ error: 'You do not have permission to update this post' });
        }
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { title, content }
        });
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error)
        return res.status(500).json(error);
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const postId: number = Number(req.params.id);
        const { userId, userRole } = req.body;

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if ((post.userId !== parseInt(userId)) && (userRole === "USER")) {
            return res.status(403).json({ error: 'You do not have permission to delete this post' });
        }
        const deletedPost = await prisma.post.delete({
            where: { id: postId }
        });
        return res.status(204)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error);
    }
}
