const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.get('/', portfolioController.getFullPortfolio);
router.post('/contact', portfolioController.submitContact);

module.exports = router;
