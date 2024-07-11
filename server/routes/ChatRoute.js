const express = require("express");
const router = express.Router();

const {sendMessage , getMessage, getSidePanelUsers ,sendFriendRequest , acceptFriendRequest , rejectFriendRequest} = require('../controllers/chat');
const {verifyToken, verifyTokenAndAdmin} = require("../middlewares/verify");


router.get('/:id/getMessage' ,verifyToken ,getMessage);
router.post('/:id/sendMessage', verifyToken , sendMessage);
router.post('/:id/sendRequest', verifyToken , sendFriendRequest);
router.post('/:id/accept', verifyToken , acceptFriendRequest);
router.post('/:id/reject', verifyToken , rejectFriendRequest);
router.get('/getUsers', verifyToken , getSidePanelUsers);

module.exports = router ;