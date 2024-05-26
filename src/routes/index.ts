import { Router } from 'express';
import usersRouter from './users';
import authRouter from "./auth";
import postsRouter from "./posts";


const rootRouter: Router = Router();

rootRouter.use('/', authRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/posts', postsRouter)

export default rootRouter;