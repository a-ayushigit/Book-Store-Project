const express = require('express');
const router = express.Router();

const {getAllReviews , getOneReview , updateReview , deleteReview , createReview } = require("../controllers/review");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");

// router.route('/').get(getAllReviews);
// router.route('/').post(createReview);
// router.route('/:id').get(getOneReview);
// router.route('/:id').put(updateReview);
// router.route('/:id').delete(deleteReview);

router.get('/' ,getAllReviews );
router.get('/:id' , getOneReview);
router.post('/:id' , verifyTokenAndAdmin , createReview);
router.put('/:id', verifyTokenAndAdmin , updateReview);
router.delete('/:id' , verifyTokenAndAdmin , deleteReview);

module.exports = router ;