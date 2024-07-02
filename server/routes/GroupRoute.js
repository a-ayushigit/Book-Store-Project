const express = require('express');
const router = express.Router();

const {getAllGroups , getOneGroup , updateGroup , deleteGroup , createGroup , requestMember , acceptMember , rejectMember} = require("../controllers/group");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin ,  verifyTokenAndModerator} = require("../middlewares/verify");

// router.route('/').get(getAllGroups);
// router.route('/').post(createGroup);
// router.route('/:id').get(getOneGroup);
// router.route('/:id').put(updateGroup);
// router.route('/:id').delete(deleteGroup);

router.get('/' ,getAllGroups );
router.get('/:id' , getOneGroup);
router.post('/createGroup' , createGroup);
router.put('/:id',  verifyTokenAndModerator, updateGroup);
router.delete('/:id' ,  verifyTokenAndModerator , deleteGroup);
router.post('/:id/request/:userId', requestMember);
router.post('/:id/accept/:userId', verifyTokenAndModerator, acceptMember);
router.post('/:id/reject/:userId', verifyTokenAndModerator, rejectMember);



module.exports = router ;