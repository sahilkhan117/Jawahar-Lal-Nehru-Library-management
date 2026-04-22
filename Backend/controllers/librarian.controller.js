const Student = require('../models/Student.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const csv = require('csv-parser');

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const { enrollmentNumber, name, password, department, semester, fatherName, mobileNo, email } = req.body;
    
    const existing = await Student.findOne({ enrollmentNumber });
    if (existing) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password || 'std123', 10);
    
    const student = await Student.create({
      enrollmentNumber,
      name,
      password: hashedPassword,
      department,
      semester,
      fatherName,
      mobileNo,
      email
    });

    res.status(201).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: 'Error creating student' });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { name, department, semester, fatherName, mobileNo, email } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, department, semester, fatherName, mobileNo, email },
      { new: true }
    );
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student' });
  }
};

// Reset Student Password
exports.resetStudentPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Student.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student' });
  }
};

// Get all Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.status(200).json({ success: true, students });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Bulk import students from CSV
exports.bulkImportStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const results = [];
    const existingEnrollments = new Set(
      (await Student.find({}, 'enrollmentNumber')).map(s => s.enrollmentNumber)
    );

    // Default hashed password for bulk created students
    const defaultPassword = await bcrypt.hash('std123', 10);

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Only process rows that have an enrollment number and aren't duplicates
        if (data.enrollmentNumber && !existingEnrollments.has(data.enrollmentNumber)) {
          // If password is provided in CSV, hash it, otherwise use default
          data.password = defaultPassword;
          results.push(data);
          existingEnrollments.add(data.enrollmentNumber); // Prevent duplicates within same CSV
        }
      })
      .on('end', async () => {
        try {
          fs.unlinkSync(req.file.path); // Remove file
          
          if (results.length === 0) {
             return res.status(400).json({ message: 'No valid new students found to import. They may already exist.' });
          }

          const inserted = await Student.insertMany(results, { ordered: false });
          res.status(201).json({ message: `Successfully imported ${inserted.length} students`, count: inserted.length });
        } catch (dbError) {
          console.error('Bulk insert error:', dbError);
          if (dbError.code === 11000) {
             return res.status(207).json({ 
                message: 'Partial import completed. Some enrollments already existed.', 
                count: dbError.insertedDocs ? dbError.insertedDocs.length : 0 
             });
          }
          res.status(500).json({ message: 'Database error during bulk import' });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during bulk import' });
  }
};
