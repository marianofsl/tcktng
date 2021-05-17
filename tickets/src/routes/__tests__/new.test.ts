import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

let post: request.Request;
let anonymousPost: request.Request;

beforeEach(async () => {
    anonymousPost = request(app).post('/api/tickets');
    post = request(app).post('/api/tickets').set('Cookie', global.signin());
});

it('/api/tickets has a route handler', async () => {
    const response = await anonymousPost.send({});
    expect(response.statusCode).not.toEqual(404);
});

it('returns an error when the user is not authenticated', async () => {
    const response = await anonymousPost.send({});
    expect(response.statusCode).toEqual(401);
});

it('returns a status code other than 401 when the user is authenticated', async () => {
    const response = await post.send({});
    expect(response.statusCode).not.toEqual(401);
});

it('returns an error when a invalid title is provided', async () => {
    await post
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await post
        .send({
            price: 10
        })
        .expect(400);
});

it('returns an error when a invalid price is provided', async () => {
    await post
        .send({
            title: 'Title',
            price: -10
        })
        .expect(400);

    await post
        .send({
            title: 'Title'
        })
        .expect(400);
});

it('returns successfully when a valid ticket is provided', async () => {
    const title = "Title";
    const price = 20;

    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const response = await post.send({
        title,
        price
    });

    expect(response.statusCode).toEqual(201);
    tickets = await Ticket.find({});
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(price);
});