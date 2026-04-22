require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/telemetry', require('./routes/telemetry.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/books', require('./routes/book.routes'));
app.use('/api/transactions', require('./routes/transaction.routes'));
app.use('/api/complaints', require('./routes/complaint.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/librarian', require('./routes/librarian.routes'));

app.get('/', (req, res) => {
  res.send('Library Management System API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('--- BACKEND ERROR LOG ---');
  console.error(`Timestamp: ${new Date().toISOString()}`);
  console.error(`Method: ${req.method} | URL: ${req.url}`);
  console.error('Stack Trace:', err.stack);
  console.error('--------------------------');
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
