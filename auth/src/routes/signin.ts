import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@tcktng/common';
import { User } from '../models/User';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is not supplied')
],
validateRequest
, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);
    if (!passwordsMatch){
        throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const token = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    // Save on session

    req.session = {
        jwt: token
    }

    res.status(200).send(existingUser);
});


export { router as signinRouter };