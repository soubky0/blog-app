import request from 'supertest';
import app from '../../src/app';
import {beforeAll, describe, expect, it} from "@jest/globals";
import prisma from "../prisma";

let userId : string;

beforeAll(async  () =>{
    const user = await prisma.user.findUnique({
        where: {username:'test'}
        }
    )
    if (user){
        await prisma.user.delete({
            where:{
                id: user.id
            }
        })
    }
})

describe('Authentication Controller', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'test',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username', 'test');
        expect(response.body).toHaveProperty('email', 'test@example.com');
        userId = response.body.id;
    });

    it('shouldn\'t register same user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'test',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    })

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
    it('shouldn\'t login user with wrong password', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'test@example.com',
                password: 'password'
            });
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
    });
});

describe('Users Controller', () => {
    it('should get users info', async () => {
        const response = await request(app)
            .get(`/api/users/${userId}`)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('role')
    });

    it('should get error', async () => {
        const response = await request(app)
            .get('/api/users/0')
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    })
});