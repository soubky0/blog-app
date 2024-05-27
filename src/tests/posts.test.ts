import request from 'supertest';
import app from '../../src/app';
import {describe, expect, it, beforeAll, afterAll} from "@jest/globals";
import { client, connectRedis } from '../redisClient';

let token: string;
let postId: string;


beforeAll(async () => {
    await connectRedis();
    try {
        const newUser = await request(app)
            .post('/api/register')
            .send({
                username: 'postUser',
                email: 'postUser@example.com',
                password: 'password'
            })
    } finally {
        const login = await request(app)
            .post('/api/login')
            .send({ email: 'postUser@example.com', password: 'password' });
        token = `token=${login.body.token}`;
    }
});

afterAll(async () => {
    await client.quit();
});

describe('Posts Controller', () => {
    it('should create a post', async () => {
        const response = await request(app)
            .post("/api/posts")
            .set({
                "Cookie": token
            })
            .send({
                title: "test post title",
                content: "test post content"
            })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("content")
        postId = response.body.id
    })

    it('should get post by id', async  () =>{
        const response = await request(app)
            .get(`/api/posts/${postId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("content")
    })
    it('should get all posts', async () => {
        const response = await request(app)
            .get('/api/posts')
        expect(response.status).toBe(200);
    });

    it('should update post', async () => {
        const response = await request(app)
            .put(`/api/posts/${postId}`)
            .set({
                "Cookie": token
            })
            .send({
                title: "test post title after update",
                content: "test post content after update"
            })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("content")
    })

    it('should delete post', async () => {
        const response = await request(app)
            .delete(`/api/posts/${postId}`)
            .set({
                "Cookie": token
            })
        expect(response.status).toBe(204);
    })
});
