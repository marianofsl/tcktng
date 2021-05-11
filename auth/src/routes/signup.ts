import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator';
import { BadRequestError } from '../errors/BadRequestError';
import { User } from '../models/User';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Passord must be between 4 and 20 characters'),
],
validateRequest
,
async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({
        email: email,
        password: password
    });

    await user.save();
    // Generate JWT
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)

    // Save on session

    req.session = {
        jwt: token
    }

    res.status(201).send(user);
});


export { router as signupRouter };