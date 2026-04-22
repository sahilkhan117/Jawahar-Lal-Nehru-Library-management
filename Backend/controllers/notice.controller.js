const Notice = require('../models/Notice.model');

// Create a new notice (Admin only)
exports.createNotice = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    // We're mapping the frontend 'Category' to the backend 'targetAudience' or 'priority' 
    // depending on the schema, but wait, schema has targetAudience and priority.
    // Let's adapt to schema: targetAudience default 'All', priority default 'Medium'
    // Actually, noticeSchema has no 'category' field. Let's assume title and content are enough for now, 
    // or add 'category' mapping.
    
    const notice = await Notice.create({
      title,
      content,
      // Defaulting these since schema supports it
      targetAudience: 'All', 
      priority: category === 'Alert' ? 'High' : 'Medium'
    });

    res.status(201).json({ success: true, notice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create notice' });
  }
};

// Get all active notices
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notices' });
  }
};
