import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

let get: (id: string) => request.Request = (id: string) => request(app).get(`/api/tickets/${id}`);

it('return 404 if the ticket is not found', async () => {
    await get("adfasdf").send().expect(404);
});


it('return the ticket if it is found', async () => {
    const title = 'Concert';
    const price = 1;

    let response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title, price
        })
        .expect(201);

    const ticketCreated = response.body;

    expect(ticketCreated).toHaveProperty('id');
    expect(ticketCreated).toHaveProperty('title');
    expect(ticketCreated.title).toEqual(title);
    expect(ticketCreated).toHaveProperty('price');
    expect(ticketCreated.price).toEqual(price);
    
    const id = ticketCreated.id;

    response = await get(id).send().expect(404);

    const ticketFound = response.body;

    expect(ticketFound).toHaveProperty('id');
    expect(ticketFound).toHaveProperty('title');
    expect(ticketFound.title).toEqual(title);
    expect(ticketFound).toHaveProperty('price');
    expect(ticketFound.price).toEqual(price);
});
