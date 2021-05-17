import express, { Request, Response } from 'express'
import { currentUser, NotFoundError, validateRequest, UnauthorizedError } from '@tcktng/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket'

const router = express.Router();

router.put('/api/tickets/:id', currentUser, [
    body('title')
        .notEmpty()
        .withMessage('A valid title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('A valid price is required'),
], validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, price } = req.body;
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser?.id) {
            throw new UnauthorizedError();
        }

        ticket.set({ title, price });
        await ticket.save();

        res.status(200).send(ticket);
    });

export { router as updateRouter };