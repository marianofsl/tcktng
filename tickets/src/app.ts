import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@tcktng/common';
import { newRouter } from './routes/new';
import { showRouter } from './routes/show';
import { indexRouter } from './routes';
import { updateRouter } from './routes/update';

const app = express()
    .set('trust proxy', true)
    .use(json())
    .use(cookieSession({
        signed: false,
        secure: false//process.env.NODE_ENV !== 'test' //secure is disable in tests
    }))
    .use(newRouter)
    .use(showRouter)
    .use(indexRouter)
    .use(updateRouter)
    .all('*', async (req, res) => {
        throw new NotFoundError();
    })
    .use(errorHandler);

export { app };