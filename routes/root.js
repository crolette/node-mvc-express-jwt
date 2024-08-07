const express = require('express');
const router = express.Router();
const path = require('path');
const refreshTokenController = require('../controllers/refreshTokenController');

router.get('^/$|/index(.html)?', refreshTokenController.handleRefreshToken, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;