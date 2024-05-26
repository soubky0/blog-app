import { NextFunction, Request, Response } from 'express';
import {client} from '../redisClient';

export const invalidatePostsCache = async (req: Request, res: Response, next: NextFunction) => {
    await client.del('posts');
    next();
};
