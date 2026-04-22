require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Student = require('./models/Student.model');
const Complaint = require('./models/Complaint.model');

const sampleComplaints = [
  {
    issueDescription: "The reading hall lights on the 2nd floor have been flickering for the past week. It is causing eye strain and making it impossible to study comfortably.",
    status: "Pending"
  },
  {
    issueDescription: "The air conditioning unit in Section B is broken. The room is too hot and students cannot focus during afternoon sessions.",
    status: "Pending"
  },
  {
    issueDescription: "Several electrical sockets near the computer terminals are not working. Students cannot charge their laptops during long study sessions.",
    status: "Resolved"
  },
  {
    issueDescription: "The self-checkout kiosk on the ground floor has been out of service for 3 days. All students are being funneled to a single counter causing long queues.",
    status: "Pending"
  },
  {
    issueDescription: "A water leak from the ceiling in the periodicals section is dripping onto the newspaper archive shelf. Some old issues may have been damaged.",
    status: "Pending"
  },
  {
    issueDescription: "The WiFi password has not been updated on the display board, the one currently shown is incorrect and students cannot connect.",
    status: "Resolved"
  }
];

async function seedComplaints() {
  await connectDB();
  console.log('Connected. Seeding complaints...');

  // Get any student to attach the complaints to
  const students = await Student.find().limit(3);
  if (students.length === 0) {
    console.log('No students found! Please seed students first.');
    process.exit(1);
  }

  // Delete existing complaints
  await Complaint.deleteMany({});
  console.log('Cleared existing complaints.');

  // Assign complaints to students in a round-robin fashion
  const complaintsToInsert = sampleComplaints.map((c, i) => ({
    ...c,
    studentId: students[i % students.length]._id
  }));

  await Complaint.insertMany(complaintsToInsert);
  console.log(`✅ Successfully seeded ${complaintsToInsert.length} sample complaints!`);
  process.exit(0);
}

seedComplaints().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
