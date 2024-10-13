import express from 'express';
import { cloudinaryFileUploader } from '../middleware/fileUploader.js';
import { createEmploye, DeleteEmploye, getAllEmploye, getEmployeById, updateEmploye } from '../controllers/EmpolyeController.js';

const router = express.Router();

router.get('/', getAllEmploye)

router.get('/:id', getEmployeById)

router.delete('/delete/:id', DeleteEmploye)

router.post('/create', cloudinaryFileUploader.single('profileImage'), createEmploye)

router.put('/update/:id', cloudinaryFileUploader.single('profileImage'), updateEmploye)


// router.post('/create', (req, res) => {
//     res.send('Emplolye Created Successfully')
// })

export default router
