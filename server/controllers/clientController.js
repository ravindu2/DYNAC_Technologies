const Client = require('../models/Client');

// Add a new client
const addClient = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newClient = await Client.create({ name, email, phone, address });
    res.status(201).json({ id: newClient._id, message: 'Client added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a client by ID
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true } // Return the updated document
    );

    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ message: 'Client updated successfully', client: updatedClient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search and filter clients
const searchClients = async (req, res) => {
  const { name, email, phone } = req.query;

  try {
    const query = {};

    if (name) {
      query.name = { $regex: `^${name}`, $options: 'i' }; // Case-insensitive regex for name
    }
    if (email) {
      query.email = email;
    }
    if (phone) {
      query.phone = phone;
    }

    const clients = await Client.find(query);
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addClient, getClients, updateClient, deleteClient, searchClients };
