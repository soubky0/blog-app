import request from 'supertest';
import app from '../../src/app';
import {describe, expect, it, beforeAll, afterAll} from "@jest/globals";
import { client, connectRedis } from '../redisClient';

let token: string;
let commentId: string;
let postId: string;


beforeAll(async () => {
    await connectRedis();
    try {
        const newUser = await request(app)
            .post('/api/register')
            .send({
                username: 'commentUser',
                email: 'commentUser@example.com',
                password: 'password'
            })
    } finally {
        const login = await request(app)
            .post('/api/login')
            .send({ email: 'commentUser@example.com', password: 'password' });
        token = `token=${login.body.token}`;
    }
    const createPost = await request(app)
        .post("/api/posts")
        .set({
            "Cookie": token
        })
        .send({
            title: "test post title",
            content: "test post content"
        })
    postId = createPost.body.id
});

afterAll(async () => {
    await client.quit();
});

describe('Comments Controller', () => {
    it('should create a comment', async () => {
        const response = await request(app)
            .post(`/api/posts/${postId}/comments`)
            .set({
                "Cookie": token
            })
            .send({
                content: "test comment content"
            })
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("content")
        commentId = response.body.id
    })

    it('should get all comments by post id', async  () =>{
        const response = await request(app)
            .get(`/api/posts/${postId}/comments`)
        expect(response.status).toBe(200)
    })

    it('should update comment', async () => {
        const response = await request(app)
            .put(`/api/comments/${commentId}`)
            .set({
                "Cookie": token
            })
            .send({
                content: "test comment content after update"
            })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("content")
    })

    it('should delete comment', async () => {
        const response = await request(app)
            .delete(`/api/comments/${commentId}`)
            .set({
                "Cookie": token
            })
        expect(response.status).toBe(204);
    })
});
