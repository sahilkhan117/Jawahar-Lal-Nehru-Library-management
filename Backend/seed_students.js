require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Student = require('./models/Student.model');

// Connect to DB
const connectDB = require('./config/db');

const rawData = `
MohitSahu Y24170536 BCA IV 9039149403
AdityaVishwakarma Y24170506 BCA IV 8737861471
SatyamPrakash Y23170528 BCA VI 9117256040
AdityaPratapSinghParihar Y25271003 MCA II 7987678526
SarvajeetKumar Y25271035 MCA II 7818983195
Prince Y23601015 B.Tech.(CSE) VI 9034774926
ShaanChoubey Y23601045 B.Tech.(CSE) VI 9301397298
PoorviSahu Y23601038 B.Tech. VI 9074554804
LizaShaikh Y23601046 B.Tech. VI 7796726770
AlokKumar Y24170507 BCA IV 9065623675
RiteshChauhan Y24104063 B.Sc.(CBZ) IV 9229037908
RiddhiJain Y23601042 B.Tech.(CSE) VI 9755398413
AmritKumar Y25601006 B.Tech.(CSE) II 7811968050
ChandaBiswakarma Y25602013 B.Tech.(ECE) II 8811913058
VijayKumarSaw Y25603033 B.Tech.(AE) II 7761832001
SahilKhan Y226101044 B.Tech.(CSE) VIII 9303909219
AdityaDhanraj Y226101002 B.Tech. VIII 9473139895
UjjawalKumar Y25271039 MCA II 7254073298
ShudhanshuKumar Y25271037 MCA II 8757360210
Adarsh Y25170562 BCA II 7525989477
VishalYadav Y25271045 MCA II 9984426513
AnkitKumar Y24170510 BCA IV 7091024920
PrayatnSoni Y25246023 MSc(AI&BDA) II 8109977415
AbhijeetSoni Y25246014 MSc(AI&BDA) II 7415081993
MausamLodhi Y226101031 B.Tech. VIII 8827149667
RajeshYadav Y226101526 B.Tech.(ECE) VIII 6264071427
AbhishekKumarYadav Y24104006 B.Sc.(Bio.)-CBZ IV 7985046564
AryanTiwary Y25271007 MCA II 7903850774
VanchhitMishra Y25271041 MCA II 8318060066
Neetendra Y24170537 BCA IV 812749523
`;

const romanToNum = {
  'I': 1, 'II': 2, 'III': 3, 'IV': 4,
  'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8
};

const parseData = async () => {
  const lines = rawData.trim().split('\n').filter(l => l.trim().length > 0);
  const students = [];
  
  const hashedPassword = await bcrypt.hash('password123', 10);

  for (let line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 4) continue;
    
    const contactIndex = parts.length - 1;
    const semIndex = parts.length - 2;
    
    const name = parts[0];
    const rollNo = parts[1];
    const mobileNo = parts[contactIndex];
    const semesterRoman = parts[semIndex];
    const semester = romanToNum[semesterRoman] || 1;
    
    const courseParts = parts.slice(2, semIndex);
    const course = courseParts.join(' ');
    
    // Add spaces before capital letters to format CamelCase names to readable names
    const formattedName = name.replace(/([A-Z])/g, ' $1').trim();

    students.push({
      enrollmentNumber: rollNo,
      password: hashedPassword,
      name: formattedName,
      department: course,
      semester: semester,
      email: `${rollNo.toLowerCase()}@student.university.edu`,
      fatherName: `Mr. ${formattedName.split(' ').pop()} Sr.`, // Generated dummy data
      mobileNo: parseInt(mobileNo) || 0,
      address: 'University Campus Hostel',
      totalActiveFines: Math.floor(Math.random() * 10) * 10, // Random fines 0-90
      attendanceHistory: [new Date()]
    });
  }
  
  return students;
};

const seed = async () => {
  await connectDB();
  
  try {
    const students = await parseData();
    console.log(`Prepared ${students.length} student records for insertion.`);
    
    // Clear existing to avoid duplicates or just insert new ones
    // We will use bulk operations with upsert to prevent errors if they already exist
    let count = 0;
    for (let st of students) {
      await Student.findOneAndUpdate(
        { enrollmentNumber: st.enrollmentNumber },
        { $set: st },
        { upsert: true, new: true }
      );
      count++;
    }
    
    console.log(`Successfully seeded ${count} students into MongoDB Atlas!`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

seed();
