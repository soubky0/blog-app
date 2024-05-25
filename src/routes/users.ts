import { Router } from 'express';
import {getUser} from "../controllers/users";

const usersRouters: Router = Router();

usersRouters.get('/:id',getUser)

export default usersRouters;