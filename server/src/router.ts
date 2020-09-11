import { Router } from 'express';
import studentController from './controllers/StudentController';
const router = Router();

router.post('/students', (req, res) => studentController.studentData(req, res));

export default router;
