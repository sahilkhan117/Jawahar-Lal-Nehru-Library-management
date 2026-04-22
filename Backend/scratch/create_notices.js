const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Notice = require('../models/Notice.model');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function createSampleNotices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const sampleNotices = [
      {
        title: "Library Maintenance Notice",
        content: "The library will be closed for maintenance on Sunday, April 26th, from 9:00 AM to 5:00 PM. Please plan your visits accordingly.",
        priority: "Medium",
        targetAudience: "All"
      },
      {
        title: "New Books Arrival!",
        content: "We have just added 50+ new titles to the Computer Science section, including the latest editions of 'Effective Java' and 'Clean Code'.",
        priority: "Low",
        targetAudience: "Student"
      },
      {
        title: "Urgent: Book Return Deadline",
        content: "All books issued before March 1st must be returned by the end of this week to avoid increased overdue fines.",
        priority: "High",
        targetAudience: "Student"
      }
    ];

    await Notice.deleteMany({ targetAudience: { $in: ['All', 'Student'] } });
    await Notice.insertMany(sampleNotices);

    console.log('Successfully created 3 sample notices for students.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to create notices:', error);
    process.exit(1);
  }
}

createSampleNotices();
