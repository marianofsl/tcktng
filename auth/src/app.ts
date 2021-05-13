import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@tcktng/common';

const app = express()
    .set('trust proxy', true)
    .use(json())
    .use(cookieSession({
        signed: false,
        secure: false//process.env.NODE_ENV !== 'test' //secure is disable in tests
    }))
    .use(signinRouter)
    .use(signoutRouter)
    .use(signupRouter)
    .use(currentUserRouter)
    .all('*', async (req, res) => {
        throw new NotFoundError();
    })
    .use(errorHandler);

export { app };