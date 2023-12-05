import express from 'express';

import {
    getAllHistory,
    createHistory,
} from '../controllers/history.controller.js';

const router = express.Router()

router.get('/', getAllHistory)
router.post('/', createHistory)

export default router;