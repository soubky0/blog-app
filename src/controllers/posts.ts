import {NextFunction, Request, Response} from "express";
import  prisma  from "../prisma"
import {HttpError} from "../middleware/errorHandler";
import {client} from "../redisClient";
import {logger} from "../logger";
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, title, content } = req.body;
    if (!title) {
        return next(new HttpError("Title is required!", 400));
    }
    if (!content) {
        return next(new HttpError("Content is required!", 400));
    }
    try {
        const newPost = await prisma.post.create({
            data: { userId, title, content }
        })
        logger.info(`Post ${newPost.id} created by user ${userId}`)
        return res.status(201).json({id:newPost.id, title:newPost.title, content:newPost.content})
    } catch (error) {
        next(error)
    }
}

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cachedPosts = await client.get('posts');
        if (cachedPosts) {
            return res.status(200).json(JSON.parse(cachedPosts));
        }

        const posts = await prisma.post.findMany();
        await client.set('posts', JSON.stringify(posts), {
            EX: 3600,
        });

        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: number = Number(req.params.id);
        const post = await prisma.post.findUnique({
            where: {id: postId}
            }
        )
        if (!post) {
            return next(new HttpError(`Post with id ${postId} not found`,404))
        }
        return res.status(200).json(post);
    } catch (error) {
        next(error)
    }
}
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: number = Number(req.params.id);
        const { userId, userRole, title, content } = req.body;

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return next(new HttpError(`Post with id ${postId} not found`,404))
        }
        if ((post.userId !== parseInt(userId)) && (userRole === "USER")) {
            return next(new HttpError('You do not have permission to update this post', 403));
        }
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { title, content }
        });
        return res.status(200).json(updatedPost);
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId: number = Number(req.params.id);
        const { userId, userRole } = req.body;

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return next(new HttpError(`Post with id ${postId} not found`,404))
        }
        if ((post.userId !== parseInt(userId)) && (userRole === "USER")) {
            return next(new HttpError('You do not have permission to update this post', 403));
        }
        const deletedPost = await prisma.post.delete({
            where: { id: postId }
        });
        return res.status(204).json(deletedPost)
    } catch (error) {
        next(error)
    }
}
