const express = require("express");
const router = express.Router();

const {getPayment ,orderItems , verifySignature } = require('../controllers/payments');

router.get('/get-payment' , getPayment);
router.post('/order' ,orderItems );
router.post('/verify', verifySignature );


module.exports =  router ;