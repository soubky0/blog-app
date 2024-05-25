import { Router } from 'express';
import usersRouter from './users';
import authRouter from "./auth";
import {jwtAuthentication} from "../middleware/jwtAuthentication";

const rootRouter: Router = Router();

rootRouter.use('/', authRouter);
rootRouter.use('/users',jwtAuthentication, usersRouter);

export default rootRouter;