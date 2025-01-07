const Client = require('../models/Client');
const Trainer = require('../models/Trainer');


const getStats = async (req, res) => {
  try {
    // Fetch counts from MongoDB
    const membersCount = await Client.countDocuments();
    const trainersCount = await Trainer.countDocuments();
    
    

    // Send the response
    res.json({
      members: membersCount,
      trainers: trainersCount,
    
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStats };
