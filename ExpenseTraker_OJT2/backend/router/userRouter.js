const express = require('express');
const { loginController, logoutController, signupContorller,resetpasswordContorller,resetpassword_post } = require('../controller/userController');
const router = express.Router();

router.post('/login' ,loginController);
router.get('/logout', logoutController);
router.post('/signup', signupContorller);
router.post('/resetpassword', resetpasswordContorller);
router.post("/resetpassword_post", resetpassword_post) 



module.exports = router;