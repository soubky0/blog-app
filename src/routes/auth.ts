import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from "../prisma";
import { JWT_SECRET }  from "../secrets";

const authRouter: Router = Router();

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username) {
        return res.status(400).send({ error: "username is required" })
    } else if (!email) {
        return res.status(400).send({ error: "email is required" })
    } else if (!password) {
        return res.status(400).send({ error: "password is required" })
    } else {
        try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }]}});

                if (existingUser) {
                    return res.status(400).json({ error: 'Username or email already exists' });
                }
                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await prisma.user.create({
                    data: { username, email, password: hashedPassword },
                });
                res.status(201).json({ id: user.id, username: user.username, email: user.email });
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Email is required!" })
    } else if (!password) {
        return res.status(400).send({ error: "Password is required!" })
    } else {
        try {
            const user = await prisma.user.findFirst({
                where: {email},
            })
            if (!user)
                return res.status(401).send({error: 'Email not registered!'});
            const isAuthenticated = await bcrypt.compare(password, user.password)
            if (!isAuthenticated)
                return res.status(401).send({error: 'Wrong Password!'})
            const token = jwt.sign({ userId: user.id, userRole: user.role }, JWT_SECRET, {expiresIn: '15m'});
            res = res.cookie('token', token);
            return res.status(200).json({token})
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
})

export default authRouter