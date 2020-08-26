import { Router } from 'express';
import studentController from './controllers/StudentController';
const router = Router();

router.post('/students', studentController.getData);

export default router;
