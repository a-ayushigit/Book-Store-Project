const express = require('express');
const router = express.Router();

const {getAllBooks , getOneBook , updateBook , deleteBook , createBook } = require("../controllers/books");

const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");

// router.route('/').get(getAllBooks);
// router.route('/').post(createBook);
// router.route('/:id').get(getOneBook);
// router.route('/:id').put(updateBook);
// router.route('/:id').delete(deleteBook);

router.get('/' ,getAllBooks );
router.get('/:id' , getOneBook);
router.post('/:id' , verifyTokenAndAdmin , createBook);
router.put('/:id', verifyTokenAndAdmin , updateBook);
router.delete('/:id' , verifyTokenAndAdmin , deleteBook);

module.exports = router ;
