const express = require('express');
const {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
} = require('../controllers/packageController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPackage);
router.get('/', authMiddleware, getPackages);
router.put('/:id', authMiddleware, updatePackage);
router.delete('/:id', authMiddleware, deletePackage);

module.exports = router;
