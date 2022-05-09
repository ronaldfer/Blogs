const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')


//express app
const app = express();

//Connect to Mongo db URI

const dbName = 'BlogsProject'
const dbURI = `mongodb+srv://trial:test12@cluster0.ja6wg.mongodb.net/]BlogsProject?retryWrites=true&w=majority`


//connecting to Mongo DB
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
    .then((result) =>console.log('connected to DB'))
    .catch(err => console.log(err))

app.set('view engine','ejs');
// if we want to set views folder to some different folder
// app.set('views','htmlFiles')

//Listening at port 3000
app.listen(3000);

//creating custom middleware
// app.use((req,res,next)=>{
//     console.log("Request Made :");
//     console.log('HOST : ',req.hostname);
//     console.log('PATH : ',req.path);
//     console.log('METHOD : ',req.method);
//     console.log("-------xxxx-----")
//     next();
// })

//middleware & static files
app.use(express.static('public'));

//morgan middleware (LOGGER)
// app.use(morgan('tiny'));
 
// mongoose and mongo sandbox routes 
app.get('/add-blog',(req,res) =>{
    //create a blog instance
    const blog = new Blog({
        title:'new blog',
        snippet:'about my new blog',
        body:'loremasdnjsdsjnfnvjd sdfnksdkf sdfnhsjdhfjasdc sdnfjdss jasdjsbnsd jnsjkasn'
    });
    // to store data to DB
    blog.save() // returns a promise
        .then((result) =>{ //when promise is resolved do this
            res.send(result)
        })
        .catch(err => console.log(err))
})

app.get('/all-blogs',(req,res) =>{
    Blog.find()
        .then(result=>{
            res.send(result)
        })
        .catch(err=>console.log(err))
});

app.get('/single-blog',(req,res)=>{
    Blog.findById('62754b0665ec31dc6191bcd8')
        .then((result) =>{
            res.send(result)
        })
        .catch(err=>console.log(err))
})



//Handling Requests
app.get('/',(req,res) =>{
    const blogs = [
        {title:"Mario",snippet:"Lorem ipsum dolor sit amet consectetur"},
        {title:"Yoshi",snippet:"Lorem ipsum dolor sit amet consectetur"},
        {title:"Defeat Browser",snippet:"Lorem ipsum dolor sit amet consectetur"}
    ];
    res.render('index',{title:"Home",blogs:blogs}) //or blogs
});

app.get('/about',(req,res) =>{
    res.render('about',{title: "About" })
});

app.get('/blogs/create',(req,res) =>{
    res.render('create',{title:"Create a new blog"})
});

app.post('/about',(req,res) =>{
    res.send({
        blogs:"skamds",
        skaksakd:"sadasdas"
    })
});

//404 Page
app.use((req,res) =>{
    res.status(404).render('404',{title:"404"})
});
