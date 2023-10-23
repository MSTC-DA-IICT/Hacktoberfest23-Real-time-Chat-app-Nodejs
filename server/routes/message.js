const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');
const checkAuth = require('../middleware/check-auth');

router.get('/:chatId', checkAuth, messageController.fetchMessage);
router.post('/', checkAuth, messageController.sendMessage);

module.exports = router;