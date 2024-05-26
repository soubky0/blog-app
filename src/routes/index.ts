import { Router } from 'express';
import usersRouter from './users';
import authRouter from "./auth";
import postsRouter from "./posts";
import commentsRouter from "./comments";


const rootRouter: Router = Router();

rootRouter.use('/', authRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/posts', postsRouter);
rootRouter.use('/', commentsRouter)

export default rootRouter;