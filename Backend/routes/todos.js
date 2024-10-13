import express from 'express';
import { DeleteData, getData, SendDate, UpdateData } from '../controllers/todoControllers.js';

const router = express.Router();

router.get('/', getData);

router.post('/add', SendDate);

router.delete('/delete/:id', DeleteData);

router.put('/update', UpdateData);

export default router;