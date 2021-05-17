import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const createTicket = (body: {}, configure = (req: request.Request) => req) => configure(request(app).post("/api/tickets")).send(body);
const updateTicket = (id: string, body: {}, configure = (req: request.Request) => req) => configure(request(app).put(`/api/tickets/${id}`)).send(body);
const setCookie = (id: string = "123456", email: string = "test@test.com") => (req: request.Request) => req.set('Cookie', global.signin(id, email));
it('return 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await updateTicket(id, { title: "Concert X", price: 100 }, setCookie()).expect(404);
});

it('return 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await updateTicket(id, { title: "Concert X", price: 100 }).expect(401);
});

it('return 401 if the user does not own the ticket', async () => {
    // Create a ticket with another user
    let response = await createTicket({ title: "Concert A", price: 1 }, setCookie("9999", "test2@test.com")).expect(201);
    const ticketCreated = response.body;

    // Update the ticket created with another user
    await updateTicket(ticketCreated.id, { title: 'Concert modified', price: 1 }, setCookie()).expect(401);
});

it('return 400 if parameters for update a ticket are invalid', async () => {
    // Create a ticket with another user
    let response = await createTicket({ title: "Concert A", price: 1 }, setCookie()).expect(201);
    const ticketCreated = response.body;

    await updateTicket(ticketCreated.id, { title: '', price: 1 }, setCookie()).expect(400);

    await updateTicket(ticketCreated.id, { title: 'X', price: -1 }, setCookie()).expect(400);
});

it('return 200 if ticket has been updated', async () => {
    // Create a ticket with another user
    let response = await createTicket({ title: "Concert A", price: 1 }, setCookie()).expect(201);
    const ticketCreated = response.body;
    
    response = await updateTicket(ticketCreated.id, { title: 'Concert B', price: 10 }, setCookie()).expect(200);
    const ticketUpdated = response.body;
    expect(ticketUpdated.title).toEqual('Concert B');
    expect(ticketUpdated.price).toEqual(10);
});