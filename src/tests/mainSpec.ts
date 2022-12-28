import supertest from 'supertest';
import app from '../main';

const request = supertest(app);

describe('Test endpoint resources', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/test');
        expect(response.status).toBe(200);
    });
});

