const express = require('express');
const router = express();
const { broadcaster } = require('./broadcastController');

router.post('/broadcaster', broadcaster);

module.exports = router;
