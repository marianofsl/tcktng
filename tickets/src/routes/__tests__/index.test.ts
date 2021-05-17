import request from 'supertest';
import { app } from '../../app';

let get: () => request.Request = () => request(app).get(`/api/tickets`).send();
let createTicket = (body: {}) => request(app).post("/api/tickets").set('Cookie', global.signin("123456", "test@test.com")).send(body);

it('return a list of tickets', async () => {
    await createTicket({ title: "Concert A", price: 1 });
    await createTicket({ title: "Concert B", price: 1 });
    await createTicket({ title: "Concert C", price: 1 });

    const response = await get().expect(200);
    const tickets = response.body;
    expect(tickets.length).toEqual(3);
});
