const express = require('express');
const router = express.Router();

const {getAllBooks , getOneBook , updateBook , deleteBook , createBook } = require("../controllers/books");


router.route('/').get(getAllBooks);
router.route('/:id').post(createBook);
router.route('/:id').get(getOneBook);
router.route('/:id').put(updateBook);
router.route('/:id').delete(deleteBook);

module.exports = router ;
