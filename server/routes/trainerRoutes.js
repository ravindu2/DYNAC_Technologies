const express = require('express');
const {
  addTrainer,
  getTrainers,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware, addTrainer);
router.get('/', getTrainers);
router.put('/:id', updateTrainer);
router.delete('/:id', deleteTrainer);

module.exports = router;
