const express = require('express');
const router = express();
const { validateBroadcaster } = require('../../middleware/broadcastMiddleware');
const { broadcaster } = require('./broadcastController');

router.post('/broadcaster', validateBroadcaster, broadcaster);

module.exports = router;
