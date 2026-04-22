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

module.exports = {
  getBooks,
  addSingleBook,
  bulkImportBooks
};
