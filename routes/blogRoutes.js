const express = require('express')
//controller
const {blog_index,blog_create_get, blog_create_post, blog_details, blog_patch, blog_delete} = require('../controllers/blogController')

const router = express.Router();
const Blog = require('../models/blog') //our DB Model is called Blog

router.get('/',blog_index);

router.get('/create',blog_create_get);

router.post('/',blog_create_post);

router.get('/:id',blog_details)

router.patch('/:id',blog_patch)

router.delete('/:id',blog_delete)

module.exports = router;