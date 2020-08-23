import { Router } from 'express';
import studentController from './controllers/StudentController';
const router = Router();

/* router.get('/students', studentController.index);
router.post('/students', studentController.store);
router.delete('/students/:id', studentController.destroy);
router.get('/students/:id', studentController.show);
 */
router.post('/students', studentController.getGradesByLoggin);

export default router;
