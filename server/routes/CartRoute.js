const express = require('express');
const router = express.Router();

const {createCart , deleteCart , getAllCarts , getOneCart , updateCart} = require("../controllers/cart");

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");

router.get('/' ,verifyTokenAndAdmin,getAllCarts );
router.get('/:id' , verifyTokenAndAuthorization,getOneCart);
router.post('/:id' , verifyToken , createCart);
router.put('/:id', verifyTokenAndAuthorization , updateCart);
router.delete('/:id' ,  verifyTokenAndAuthorization, deleteCart);

module.exports = router;