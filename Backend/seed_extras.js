require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Library = require('./models/Library.model');
const Book = require('./models/Book.model');
const Librarian = require('./models/Librarian.model');
const Admin = require('./models/Admin.model');

const connectDB = require('./config/db');

const seedExtras = async () => {
  await connectDB();
  
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Seed Libraries
    console.log('Seeding Libraries...');
    const lib1 = await Library.findOneAndUpdate(
      { name: 'Jawaharlal Nehru Library' },
      { $set: { totalSeats: 250, availableSeats: 250, location: 'Main Campus' } },
      { upsert: true, new: true }
    );

    const lib2 = await Library.findOneAndUpdate(
      { name: 'Rangnathan Library' },
      { $set: { totalSeats: 200, availableSeats: 200, location: 'South Campus' } },
      { upsert: true, new: true }
    );

    const libraries = [lib1._id, lib2._id];
    console.log('Libraries seeded successfully.');

    // 2. Seed Admin
    console.log('Seeding Admin...');
    await Admin.findOneAndUpdate(
      { adminId: 'ADMIN-001' },
      { $set: { name: 'Super Admin', password: hashedPassword, accessLevel: 'SuperAdmin' } },
      { upsert: true, new: true }
    );
    console.log('Admin seeded successfully.');

    // 3. Seed Librarians
    console.log('Seeding Librarians...');
    await Librarian.findOneAndUpdate(
      { employeeId: 'LIB-101' },
      { $set: { name: 'John Doe', contactNumber: '9876543210', assignedShift: 'Morning', password: hashedPassword } },
      { upsert: true, new: true }
    );
    await Librarian.findOneAndUpdate(
      { employeeId: 'LIB-102' },
      { $set: { name: 'Jane Smith', contactNumber: '8765432109', assignedShift: 'Evening', password: hashedPassword } },
      { upsert: true, new: true }
    );
    console.log('Librarians seeded successfully.');

    // 4. Seed Books
    console.log('Seeding Books...');
    const bookTitles = [
      "Introduction to Algorithms", "Clean Code", "Design Patterns", "The Pragmatic Programmer",
      "JavaScript: The Good Parts", "Eloquent JavaScript", "You Don't Know JS", "React Up and Running",
      "Node.js Design Patterns", "Understanding ECMA Script 6", "Learning Python", "Fluent Python",
      "Data Science from Scratch", "Python Crash Course", "Head First Design Patterns", "Structure and Interpretation of Computer Programs",
      "Code Complete", "The Mythical Man-Month", "Refactoring", "Effective Java",
      "Java Concurrency in Practice", "Spring in Action", "Kubernetes Up and Running", "Docker Deep Dive",
      "The DevOps Handbook"
    ];

    let bookCount = 0;
    for (let i = 0; i < bookTitles.length; i++) {
      const title = bookTitles[i];
      const randomCopies = Math.floor(Math.random() * 5) + 1; // 1 to 5 copies
      const libraryId = libraries[Math.floor(Math.random() * libraries.length)]; // Randomly assign to lib1 or lib2
      
      await Book.findOneAndUpdate(
        { isbn: `ISBN-1000${i}` },
        {
          $set: {
            title: title,
            author: `Author ${i + 1}`,
            category: i < 10 ? 'Web Development' : (i < 15 ? 'Python/Data Science' : 'Software Engineering'),
            totalCopies: randomCopies,
            availableCopies: randomCopies,
            location: libraryId
          }
        },
        { upsert: true, new: true }
      );
      bookCount++;
    }
    console.log(`Successfully seeded ${bookCount} books.`);

    console.log('\nAll extra data seeded successfully into MongoDB Atlas!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

seedExtras();
