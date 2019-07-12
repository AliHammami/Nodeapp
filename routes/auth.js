const express = require('express');
const {register, signin, signout} = require ('../controllers/auth')
const {userById} = require ('../controllers/user')
const {registerValidator} = require ('../validator');
const router = express.Router();


router.post('/register', registerValidator, register);
router.post('/signin', signin);

router.get('/signout', signout);

//any route contain :userId our app will first execute userById()
router.param('userId', userById)
module.exports = router;