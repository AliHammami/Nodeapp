const express = require('express');
const {getPosts, createPost} = require ('../controllers/post')
const {postValidator} = require ('../validator');
const router = express.Router();

router.get('/', getPosts);
router.post('/post', postValidator, createPost);


module.exports = router;