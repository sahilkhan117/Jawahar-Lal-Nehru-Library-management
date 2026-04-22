const Book = require('../models/Book.model');
require('../models/Library.model'); // Register Library schema for populate
const fs = require('fs');
const csv = require('csv-parser');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const { query, category, shelf } = req.query;
    
    // Build query object
    let filter = {};
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { isbn: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category && category !== 'All Categories') {
      filter.category = category;
    }
    
    if (shelf && shelf !== 'All Shelves') {
      filter.shelfLocation = shelf;
    }

    const books = await Book.find(filter).populate('location');
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching books' });
  }
};

// @desc    Add a single book
// @route   POST /api/books
// @access  Private (Librarian/Admin)
const addSingleBook = async (req, res) => {
  try {
    const { title, author, isbn, category, totalCopies, availableCopies, location, coverImageUrl, publisher, edition, shelfLocation, description } = req.body;
    
    // Check if book exists
    const bookExists = await Book.findOne({ isbn });
    if (bookExists) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }

    const book = await Book.create({
      title,
      author,
      isbn,
      category,
      totalCopies,
      availableCopies,
      location,
      coverImageUrl,
      publisher,
      edition,
      shelfLocation,
      description
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding book' });
  }
};

// @desc    Bulk import books from CSV
// @route   POST /api/books/bulk
// @access  Private (Librarian/Admin)
const bulkImportBooks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const results = [];
    
    // Parse CSV
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Ensure numbers are parsed correctly and set defaults
        data.totalCopies = parseInt(data.totalCopies) || 1;
        data.availableCopies = parseInt(data.availableCopies) || 1;
        results.push(data);
      })
      .on('end', async () => {
        try {
          // Remove uploaded file after parsing
          fs.unlinkSync(req.file.path);
          
          // Insert Many (ignores existing ISBN if we use bulkWrite or we can just try/catch insertMany)
          // To be safe against duplicates, we can just insert them directly
          const inserted = await Book.insertMany(results, { ordered: false });
          res.status(201).json({ message: `Successfully imported ${inserted.length} books`, count: inserted.length });
        } catch (dbError) {
          console.error('Bulk insert error:', dbError);
          // If some failed due to unique constraints (ordered: false), Mongoose still returns the ones that succeeded
          if (dbError.code === 11000) {
             return res.status(207).json({ 
                message: 'Partial import completed. Some ISBNs already existed.', 
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

exports.getBooks = getBooks;
exports.addSingleBook = addSingleBook;
exports.bulkImportBooks = bulkImportBooks;
// Get all books with search and filter
exports.getAllBooks = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    let sortQuery = { createdAt: -1 };
    if (sort === 'oldest') sortQuery = { createdAt: 1 };
    if (sort === 'title_asc') sortQuery = { title: 1 };
    if (sort === 'title_desc') sortQuery = { title: -1 };

    const books = await Book.find(query).sort(sortQuery);

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single book details
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle Wishlist for Students
exports.toggleWishlist = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can have a wishlist' });
    }

    const Student = require('../models/Student.model');
    const student = await Student.findById(req.user.id);
    const bookId = req.params.id;

    if (!student) return res.status(404).json({ message: 'Student not found' });

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
    res.status(500).json({ message: 'Server error' });
  }
};
