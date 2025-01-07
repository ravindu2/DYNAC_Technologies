const Package = require('../models/Package');

// Create a new package
const createPackage = async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPackage = await Package.create({ name, price, description });
    res.status(201).json({ id: newPackage._id, message: 'Package created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all packages
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a package by ID
const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true } // Return the updated document
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json({ message: 'Package updated successfully', package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a package by ID
const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPackage, getPackages, updatePackage, deletePackage };
