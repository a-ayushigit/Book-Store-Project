const express = require('express');
const router = express.Router();

const {getAllGroups , getOneGroup , updateGroup , deleteGroup , createGroup , requestMember , acceptMember , rejectMember} = require("../controllers/group");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin , verifyTokenAndModeratorOrCreator} = require("../middlewares/verify");

// router.route('/').get(getAllGroups);
// router.route('/').post(createGroup);
// router.route('/:id').get(getOneGroup);
// router.route('/:id').put(updateGroup);
// router.route('/:id').delete(deleteGroup);

router.get('/' ,getAllGroups );
router.get('/:id' , getOneGroup);
router.post('/createGroup/:userId' , createGroup);
router.put('/:id',  verifyTokenAndModeratorOrCreator, updateGroup);
router.delete('/:id' ,  verifyTokenAndModeratorOrCreator , deleteGroup);
router.post('/:id/request/:userId', requestMember);
router.put('/:id/accept/:userId', verifyTokenAndModeratorOrCreator, acceptMember);
router.put('/:id/reject/:userId', verifyTokenAndModeratorOrCreator, rejectMember);



module.exports = router ;