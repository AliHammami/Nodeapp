const express = require('express');
const {register, signin} = require ('../controllers/auth')
const {registerValidator} = require ('../validator');
const router = express.Router();


router.post('/register', registerValidator, register);
router.post('/signin', signin);


module.exports = router;