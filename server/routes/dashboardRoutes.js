const express = require('express');
const { getStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/stats', getStats);

module.exports = router;
