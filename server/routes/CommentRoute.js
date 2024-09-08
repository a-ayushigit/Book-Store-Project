const express = require('express');
const router = express.Router();

const {getAllComments , getOneComment , updateComment , deleteComment , createComment } = require("../controllers/comment");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin ,  verifyTokenAndModerator} = require("../middlewares/verify");

// router.route('/').get(getAllComments);
// router.route('/').post(createComment);
// router.route('/:id').get(getOneComment);
// router.route('/:id').put(updateComment);
// router.route('/:id').delete(deleteComment);

router.get('/' ,getAllComments );
router.get('/:id' , getOneComment);
router.post('/:id' ,  verifyTokenAndAuthorization, createComment);
router.put('/:id',  verifyTokenAndAuthorization, updateComment);
router.delete('/:id' , verifyTokenAndAuthorization , deleteComment);

module.exports = router ;