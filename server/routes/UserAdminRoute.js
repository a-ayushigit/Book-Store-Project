const express = require('express');
const router = express.Router();

const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");

const {updateUser , deleteUser , getUser , getUsers , getStats} = require("../controllers/userAdmintasks");



router.put('/:id' , verifyTokenAndAuthorization , updateUser);
router.delete('/:id' , verifyTokenAndAuthorization ,deleteUser );
router.get('/find/:id' , verifyTokenAndAdmin , getUser);
router.get('/find' , verifyTokenAndAdmin , getUsers);
router.get('/stats' , verifyTokenAndAdmin , getStats);

module.exports = router;
