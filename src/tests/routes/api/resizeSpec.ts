import resizeImages from "../../../routes/api/resize";
import supertest from 'supertest';

describe('resize images', () => {
    
    it('should return 400 status if filename, width or height parameters \
    are not provided', async() => {
        const res = await supertest(resizeImages).get('/');
        expect(res.status).toEqual(400);
    });

    it('should return 400 status if filename does not exist', async () => {
        const res = await supertest(resizeImages).get('/').query({
                filename: 'doesNotExist',
                width: '150',
                height: '150'
            });
            expect(res.status).toEqual(400);
    });
    
    it('should resize and return image if it does not exist in the cache', async () => {
        const res = await supertest(resizeImages).get('/').query({
            filename: 'fjord',
            width: '200',
            height: '250'
        });
        expect(res.status).toEqual(200);
    });
});

