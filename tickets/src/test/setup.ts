import request from 'supertest';
import { MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken'

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[]
        }
    }
}

const mongo = new MongoMemoryServer();

beforeAll(async() => {
    process.env.JWT_KEY = '123';
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async ()=> {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    const token = jwt.sign({
        id: "123456",
        email: "test@test.com"
    }, process.env.JWT_KEY!)

    const session = {
        jwt: token
    };

    return [`express:sess=${Buffer.from(JSON.stringify(session)).toString('base64')}`];
}