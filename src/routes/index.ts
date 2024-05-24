import { Router } from 'express';
import usersRouter from './users';

const rootRouter: Router = Router();

rootRouter.use('/users', usersRouter);

export default rootRouter;