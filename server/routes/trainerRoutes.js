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
router.get('/', authMiddleware,getTrainers);
router.put('/:id', updateTrainer);
router.delete('/:id', authMiddleware,deleteTrainer);

module.exports = router;
