import { Router } from 'express';
import { authenticate } from 'passport';
import { sign } from 'jsonwebtoken';
//import User from '../models/User.js';
import User from '../models/User.js';

const router = Router();

router.post('/login', async (req, res, next) => {
    authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        const token = sign({ id: user._id }, 'your_jwt_secret');
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully' });
    })(req, res, next);
});

router.get('/current', authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

export default router;
