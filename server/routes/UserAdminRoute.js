const express = require('express');
const router = express.Router();
const { upload} = require('../middlewares/multer');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middlewares/verify");

const {updateUser , deleteUser , getUser , getUsers , getStats} = require("../controllers/userAdmintasks");



router.put('/:id' , verifyTokenAndAuthorization , upload.fields([
    { 
        name: 'avatar' , 
        maxCount:1
    }, 
    {
        name:'CoverImage',
        maxCount:1
    }
]) , updateUser);
router.delete('/:id' , verifyTokenAndAuthorization ,deleteUser );
router.get('/find/:id' , verifyTokenAndAdmin , getUser);
router.get('/find' , verifyTokenAndAdmin , getUsers);
router.get('/stats' , verifyTokenAndAdmin , getStats);

module.exports = router;
