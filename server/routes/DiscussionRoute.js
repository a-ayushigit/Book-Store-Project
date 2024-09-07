const express = require('express');
const router = express.Router();

const {getAllDiscussions , getOneDiscussion , updateDiscussion , deleteDiscussion , createDiscussion , getDiscussionsbyGroup} = require("../controllers/discussion");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin ,  verifyTokenAndModeratorOrCreator} = require("../middlewares/verify");

router.get('/' ,getAllDiscussions );
router.get('/:id' , getOneDiscussion);
router.get('/:groupid' , getDiscussionsbyGroup);
router.post('/createDiscussion' , createDiscussion);
router.put('/:id',  verifyTokenAndModeratorOrCreator, updateDiscussion);
router.delete('/:id' ,  verifyTokenAndModeratorOrCreator , deleteDiscussion);

module.exports = router ;