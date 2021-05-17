import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { BadRequestError, currentUser, validateRequest } from '@tcktng/common';
import { Ticket } from '../models/ticket'

const router = express.Router();

router.post('/api/tickets', currentUser, [
    body('title')
        .notEmpty()
        .withMessage('A valid title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('A valid price is required'),
], validateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;

        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        })

        await ticket.save();

        res.status(201).send(ticket);
    });

export { router as newRouter };