const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, chatController.fetchChat);
router.post('/', checkAuth, chatController.accessChat);
router.post('/group', checkAuth, chatController.createGroupChat);
router.put('/rename-group', checkAuth, chatController.renameGroupChat);
router.put('/group-add', checkAuth, chatController.addUserToGroupChat);
router.put('/group-remove', checkAuth, chatController.removeUserFromGroupChat);
router.delete('/group', checkAuth, chatController.deleteGroupChat);

module.exports = router;