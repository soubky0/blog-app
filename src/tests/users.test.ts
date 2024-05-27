import request from 'supertest';
import app from '../../src/app';
import {describe, expect, it} from "@jest/globals";

describe('Users Controller', () => {
    it('should get users info', async () => {
        const response = await request(app)
            .get('/api/users/1')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('role')
    });

    it('shouldn\'t get users info', async () => {
        const response = await request(app)
            .get('/api/users/2')
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    })
});
