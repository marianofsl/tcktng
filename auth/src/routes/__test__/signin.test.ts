import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exists is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);

});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'dgsdfgsfd'
        })
        .expect(400);
});

it('response with a cookie when valid credentials are supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
});