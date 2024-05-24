import { Router } from 'express';
import {getUsers} from "../controllers/users";

const usersRouters: Router = Router();

usersRouters.get('/:id',getUsers)

export default usersRouters;