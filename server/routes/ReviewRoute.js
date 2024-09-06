const express = require('express');
const router = express.Router();

const {getAllReviews , getOneReview , updateReview , deleteReview , createReview , getBookReviews } = require("../controllers/review");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");

// router.route('/').get(getAllReviews);
// router.route('/').post(createReview);
// router.route('/:id').get(getOneReview);
// router.route('/:id').put(updateReview);
// router.route('/:id').delete(deleteReview);

router.get('/' ,getAllReviews );
router.get('/:id' , getOneReview);
router.get('/getreview/:bookId', getBookReviews);
router.post('/create/:id' , verifyTokenAndAuthorization , createReview);
router.put('/update/:id', verifyTokenAndAuthorization, updateReview);
router.delete('/delete/:id' , verifyTokenAndAuthorization , deleteReview);

module.exports = router ;