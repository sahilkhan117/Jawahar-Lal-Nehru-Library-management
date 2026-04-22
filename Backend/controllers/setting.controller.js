const Setting = require('../models/Setting.model');
const Transaction = require('../models/Transaction.model');

// Get current settings and financial report
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({ ugBookLimit: 2, pgBookLimit: 4, maxFineLimit: 500 });
    }

    // Calculate total fine collected
    // We sum up the fineAmount from transactions where fineStatus is 'paid'
    const result = await Transaction.aggregate([
      { $match: { fineStatus: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$fineAmount' } } }
    ]);
    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({ success: true, settings, totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    const { ugBookLimit, pgBookLimit, maxFineLimit } = req.body;
    let settings = await Setting.findOne();
    
    if (!settings) {
      settings = await Setting.create({ ugBookLimit, pgBookLimit, maxFineLimit });
    } else {
      settings.ugBookLimit = ugBookLimit !== undefined ? ugBookLimit : settings.ugBookLimit;
      settings.pgBookLimit = pgBookLimit !== undefined ? pgBookLimit : settings.pgBookLimit;
      settings.maxFineLimit = maxFineLimit !== undefined ? maxFineLimit : settings.maxFineLimit;
      await settings.save();
    }

    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update settings' });
  }
};
