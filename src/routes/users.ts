import { Router } from 'express';
import {getUser} from "../controllers/users";

const usersRouter: Router = Router();

usersRouter.get('/:id',getUser)

export default usersRouter;