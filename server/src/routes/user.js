import express from 'express';

import {
    getUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router()

router.get('/:id', verifyToken, getUser)


//router.patch('/:id', verifyToken, updateUser)

export default router;