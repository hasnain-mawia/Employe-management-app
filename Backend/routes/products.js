import express from 'express';
import { inSureAutenticated } from '../middleware/auth.js';

const router = express.Router();


router.get('/all', inSureAutenticated, (req, res) => {
    res.json([
        {
            name: "Black Masterd Watch",
            price: 200,
            Description: " that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here"
        },
        {
            name: "Sliver Band Watch",
            price: 500,
            Description: " that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here"
        },
        {
            name: "Zenest Watch",
            price: 1500,
            Description: " that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here"
        },
        {
            name: "Zenest white Watch",
            price: 2500,
            Description: " that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here"
        },
    ])
})

export default router