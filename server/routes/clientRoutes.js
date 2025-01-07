const express = require('express');
const {
  addClient,
  getClients,
  updateClient,
  deleteClient,
  searchClients,
} = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addClient);
router.get('/',  getClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/search',  searchClients);

module.exports = router;
