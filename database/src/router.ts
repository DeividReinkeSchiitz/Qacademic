import { Router } from 'express';
/* import studentController from './controllers/StudentController'; */
const router = Router();

/* router.post('/students', (req, res) => studentController.getData(req, res));
 */
router.get('/', (req, res) => {
  return res.json({ a: 'ola' });
});

export default router;
