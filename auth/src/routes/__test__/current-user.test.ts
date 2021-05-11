import request from 'supertest';
import { app } from '../../app';

it('get current user', async () => {
    const signupResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const cookie = signupResponse.get('Set-Cookie');

    const currentUserResponse = await request(app)
        .get('/api/users/currentuser')
        .set("Cookie", cookie)
        .send()
        .expect(200);

    expect(currentUserResponse.body.email).toEqual('test@test.com');

    // expect(signoutResponse.get("Set-Cookie")[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
});

it('get unauthorized if not authenticated', async () => {
    const currentUserResponse = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(401);
});