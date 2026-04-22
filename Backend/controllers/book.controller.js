const Book = require('../models/Book.model');

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
