import express from 'express';
import { getStudentsx, getProgressHistoryx, addProgressNotex } from '../controllers/studentController.js';

const router = express.Router();

router.get('/students', getStudentsx);
router.get('/students/:studentId/progress', getProgressHistoryx);
router.post('/students/:studentId/progress', addProgressNotex);

export default router;
