import express from 'express';
import todos from './todos.js';
import userAuth from './UserAuth.js';
import products from './products.js';
import Employes from './empolyes.js';

const router = express.Router();

// Todos App
router.use('/todo', todos);

// User Authentication
router.use('/user', userAuth)
router.use('/products', products)
router.use('/Employes', Employes)

export default router;