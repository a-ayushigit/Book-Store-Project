const express = require('express');
const router = express.Router();

const { deleteBookShelf , updateBookShelf , createBookShelf , getOneBookShelf , deleteBookFromBookshelf , addBookToBookshelf , getUserBookshelf , getGroupBookshelf } = require("../controllers/bookshelf");

const {verifyTokenAndAuthorizationCreateBookshelf ,  verifyTokenAndAuthorizationGetBookshelf} = require("../middlewares/verify");



router.get('/:id', verifyTokenAndAuthorizationGetBookshelf , getOneBookShelf);
// router.delete('/:id', verifyTokenAndAuthorizationForBookshelf, deleteBookFromBookshelf);
// router.post('/:id', verifyTokenAndAuthorizationForBookshelf ,addBookToBookshelf );
router.post('/' , verifyTokenAndAuthorizationCreateBookshelf,createBookShelf);
// router.delete('/delete/:id', verifyTokenAndAuthorizationForBookshelf ,deleteBookShelf);
// router.put('/update/:id' ,verifyTokenAndAuthorizationForBookshelf ,updateBookShelf);


module.exports = router ;