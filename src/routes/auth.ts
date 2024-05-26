import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from "../prisma";
import { JWT_SECRET }  from "../secrets";
import {login, register} from "../controllers/auth";

const authRouter: Router = Router();

authRouter.post('/register', register)

authRouter.post('/login', login)

export default authRouter