require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Student = require('./models/Student.model');
const Librarian = require('./models/Librarian.model');
const Admin = require('./models/Admin.model');
const Book = require('./models/Book.model');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_management_system');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Student.deleteMany({});
    await Librarian.deleteMany({});
    await Admin.deleteMany({});
    await Book.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Seed Admin
    await Admin.create({
      adminId: 'admin01',
      password: hashedPassword,
      name: 'System Administrator'
    });

    // Seed Librarian
    await Librarian.create({
      employeeId: 'lib01',
      password: hashedPassword,
      name: 'John Doe',
      assignedShift: 'Morning'
    });

    // Seed Student
    await Student.create({
      enrollmentNumber: 'std01',
      password: hashedPassword,
      name: 'Jane Smith',
      department: 'Computer Science',
      semester: 4,
      fatherName: 'Robert Smith',
      totalActiveFines: 0
    });

    // Seed Books
    await Book.create([
      {
        isbn: '978-0134685991',
        title: 'Effective Java',
        author: 'Joshua Bloch',
        category: 'Computer Science',
        totalCopies: 5,
        availableCopies: 5,
        shelfLocation: 'CS-01'
      },
      {
        isbn: '978-0201633610',
        title: 'Design Patterns',
        author: 'Gang of Four',
        category: 'Software Engineering',
        totalCopies: 3,
        availableCopies: 2,
        shelfLocation: 'SE-04'
      }
    ]);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
