import request from 'supertest';
import app from '../../src/app';
import {describe, expect, it, beforeAll, afterAll} from "@jest/globals";
import { client, connectRedis } from '../redisClient';

beforeAll(async () => {
    await connectRedis();
});

afterAll(async () => {
    await client.quit();
});

describe('Posts Controller', () => {
    it('should get all posts', async () => {
        const response = await request(app)
            .get('/api/posts')
        expect(response.status).toBe(200);
    });

});
