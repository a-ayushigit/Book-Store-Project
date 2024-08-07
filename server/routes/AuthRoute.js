const express = require("express");
const router = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin , verifyToken} = require("../middlewares/verify");
const {register , login , profile , logout} = require('../controllers/auth');

// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/profile').get(profile);
// router.route('/logout').post(logout);

router.post('/register' , register);
router.post('/login',login);
router.get('/profile',profile);
router.post('/logout' ,verifyToken, logout);


module.exports = router ;
