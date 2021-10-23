const express = require('express');
const router = express();
const { validateBroadcaster } = require('../../middleware/broadcastMiddleware');
const { broadcaster, mutations } = require('./broadcastController');

router.post('/broadcaster', validateBroadcaster, broadcaster);
router.get('/mutations', mutations);

module.exports = router;
