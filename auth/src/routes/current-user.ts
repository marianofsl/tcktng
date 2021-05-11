import express from 'express'
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    if (!req.currentUser) {
        return res.status(401).send(); //Im going to respond 401 instead 200 with no body
    }

    res.send(req.currentUser);
});


export { router as currentUserRouter };