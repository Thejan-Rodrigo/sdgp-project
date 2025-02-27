const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/students', studentController.getStudents);
router.get('/students/:studentId/progress', studentController.getProgressHistory);
router.post('/students/:studentId/progress', studentController.addProgressNote);

module.exports = router;