const express = require('express');
const {userById, allUser, getUser, updateUser, deleteUser} = require ('../controllers/user')
const {requireSignin} = require ('../controllers/auth')

const router = express.Router();

router.get('/users', allUser);
router.get('/user/:userId', requireSignin, getUser);
router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);

//any route contain :userId our app will first execute userById()
router.param('userId', userById)
module.exports = router;