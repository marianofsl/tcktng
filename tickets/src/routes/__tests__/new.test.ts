import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

const post = (body: {}, configure: (req: request.Request) => request.Request = (req) => req) => configure(request(app).post('/api/tickets')).send(body);
const setCookie = (req: request.Request) => req.set('Cookie', global.signin("123456", "test@test.com"))

it('/api/tickets has a route handler', async () => {
    const response = await post({});
    expect(response.statusCode).not.toEqual(404);
});

it('returns an error when the user is not authenticated', async () => {
    const response = await post({});
    expect(response.statusCode).toEqual(401);
});

it('returns a status code other than 401 when the user is authenticated', async () => {
    const response = await post({}, setCookie);
    expect(response.statusCode).not.toEqual(401);
});

it('returns an error when a invalid title is provided', async () => {
    await post({ title: '', price: 10 }, setCookie).expect(400);
    await post({ price: 10 }, req => req.set('Cookie', global.signin())).expect(400);
});

it('returns an error when a invalid price is provided', async () => {
    await post({ title: 'Title', price: -10 }, setCookie).expect(400);
    await post({ title: 'Title' }, setCookie).expect(400);
});

it('returns successfully when a valid ticket is provided', async () => {
    const title = "Title";
    const price = 20;

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const response = await post({ title, price }, setCookie);
    expect(response.statusCode).toEqual(201);

    tickets = await Ticket.find({});

    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
});