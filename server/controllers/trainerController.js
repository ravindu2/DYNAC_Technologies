const Trainer = require('../models/Trainer');

// Add a new trainer
const addTrainer = async (req, res) => {
  const { name, expertise, email, phone } = req.body;

  // Validate input
  if (!name || !expertise || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newTrainer = await Trainer.create({ name, expertise, email, phone });
    res.status(201).json({ id: newTrainer._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all trainers
const getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a trainer
const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const { name, expertise, email, phone } = req.body;

  if (!name || !expertise || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const trainer = await Trainer.findByIdAndUpdate(
      id,
      { name, expertise, email, phone },
      { new: true }
    );
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json({ message: 'Trainer updated successfully', trainer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a trainer
const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findByIdAndDelete(id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addTrainer, getTrainers, updateTrainer, deleteTrainer };
