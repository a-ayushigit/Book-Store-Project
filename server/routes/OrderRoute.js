const express = require('express');
const router = express.Router();

const {createOrder , deleteOrder , getAllOrders , getOneOrder , updateOrder , getIncome} = require("../controllers/order");

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");
router.get('/income', verifyTokenAndAdmin ,getIncome );
router.get('/' ,verifyTokenAndAdmin,getAllOrders );
router.get('/:id' , verifyTokenAndAuthorization,getOneOrder);
router.post('/createOrder' , verifyToken , createOrder);
router.put('/:id', verifyTokenAndAdmin , updateOrder);
router.delete('/:id' ,  verifyTokenAndAdmin, deleteOrder);


module.exports = router;