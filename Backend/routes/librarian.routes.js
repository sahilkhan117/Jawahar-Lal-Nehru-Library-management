const express = require('express');
const router = express.Router();
const { 
  createStudent, updateStudent, deleteStudent, resetStudentPassword, getAllStudents, bulkImportStudents 
} = require('../controllers/librarian.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(protect, authorize('librarian', 'admin'));

router.post('/students/bulk', upload.single('file'), bulkImportStudents);
router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);
router.patch('/students/:id/reset-password', resetStudentPassword);

module.exports = router;
