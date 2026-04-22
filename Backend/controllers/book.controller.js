const Book = require('../models/Book.model');
const Student = require('../models/Student.model');
require('../models/Library.model'); // Register Library schema for populate
const fs = require('fs');
const csv = require('csv-parser');

// Get all books with search and filter (Student & Global)
exports.getAllBooks = async (req, res) => {
  try {
    const { search, category, sort, query, shelf } = req.query;
    const searchTerm = search || query;
    let filter = {};

    if (searchTerm) {
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { isbn: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (category && category !== 'All' && category !== 'All Categories') {
      filter.category = category;
    }

    if (shelf && shelf !== 'All Shelves') {
      filter.shelfLocation = shelf;
    }

    let sortQuery = { createdAt: -1 };
    if (sort === 'oldest') sortQuery = { createdAt: 1 };
    if (sort === 'title_asc') sortQuery = { title: 1 };
    if (sort === 'title_desc') sortQuery = { title: -1 };

    const books = await Book.find(filter).sort(sortQuery).populate('location');

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single book details
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('location');
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Toggle Wishlist for Students
exports.toggleWishlist = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ success: false, message: 'Only students can have a wishlist' });
    }

    const student = await Student.findById(req.user.id);
    const bookId = req.params.id;

    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    const index = student.wishlist.indexOf(bookId);
    let action = '';

    if (index === -1) {
      student.wishlist.push(bookId);
      action = 'added';
    } else {
      student.wishlist.splice(index, 1);
      action = 'removed';
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: `Book ${action} to wishlist`,
      wishlist: student.wishlist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add a single book (Librarian/Admin)
exports.addSingleBook = async (req, res) => {
  try {
    const { title, author, isbn, category, totalCopies, availableCopies, location, coverImageUrl, publisher, edition, shelfLocation, description } = req.body;
    
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res.status(400).json({ success: false, message: 'Book with this ISBN already exists' });
    }

    const book = await Book.create({
      title, author, isbn, category,
      totalCopies, availableCopies, location,
      coverImageUrl, publisher, edition,
      shelfLocation, description
    });

    res.status(201).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error adding book' });
  }
};

// Bulk import books from CSV (Librarian/Admin)
exports.bulkImportBooks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a CSV file' });
    }

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        data.totalCopies = parseInt(data.totalCopies) || 1;
        data.availableCopies = parseInt(data.availableCopies) || 1;
        results.push(data);
      })
      .on('end', async () => {
        try {
          fs.unlinkSync(req.file.path);
          const inserted = await Book.insertMany(results, { ordered: false });
          res.status(201).json({ 
            success: true, 
            message: `Successfully imported ${inserted.length} books`, 
            count: inserted.length 
          });
        } catch (dbError) {
          if (dbError.code === 11000) {
             return res.status(207).json({ 
                success: true,
                message: 'Partial import completed. Some ISBNs already existed.', 
                count: dbError.insertedDocs ? dbError.insertedDocs.length : 0 
             });
          }
          res.status(500).json({ success: false, message: 'Database error during bulk import' });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error during bulk import' });
  }
};

// Aliases for compatibility if needed
exports.getBooks = exports.getAllBooks;
