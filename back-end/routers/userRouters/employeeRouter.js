import express from 'express';
const router = express.Router();
import {getEmployees, addEmployee,getEmployee,updateEmployee,deleteEmployee} from '../../controllers/userController/employeeController.js';

router.get('/',getEmployees);
router.post('/',addEmployee);
router.get('/:id',getEmployee);
router.put('/:id',updateEmployee);
router.delete('/:id',deleteEmployee);

export default router;