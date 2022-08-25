//MVC naming convention
//blog_index,blog_details, blog_create_get, blog_create_post,blog_delete,blog_patch
const Blog = require('../models/blog') //our DB Model is called Blog


const blog_index = (req,res)=>{
    Blog.find().sort({ createdAt:-1 })
        .then((result)=>{
            res.render('index',{title:"All Blogs",blogs:result})
        })
        .catch(err=>console.log(err))
}

const blog_create_get = (req,res) =>{
    res.render('create',{title:"Create a new blog"})
}

//Controllers - RFS
const blog_create_post = (req,res,next) =>{
    const blog = new Blog(req.body)
    console.log(req.body)
    blog.save()
        .then( result =>res.redirect('/blogs'))
        .catch( err =>console.log(err))
}

const blog_details = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result) =>{
            res.status(200).render('details',{title:"Blog Detail",blog:result})
        })
        .catch(err=>res.status(404).render('404',{title:'Blog not found'}))
}

const blog_patch = (req,res)=>{
    const id = req.params.id;
    console.log(req.body)
    Blog.findByIdAndUpdate(id,req.body)
        .then((result)=>res.send({result}))
}

const blog_delete = (req,res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({ redirect :'/blogs' })
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_patch,
    blog_delete
}