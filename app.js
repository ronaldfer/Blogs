const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//Connect to Mongo db URI
const dbName = 'BlogsProject'
const dbURI = `mongodb+srv://ronaldfer747:Color742@cluster0.oa76cuq.mongodb.net/${dbName}?retryWrites=true&w=majority`

//connecting to Mongo DB, .connect returns a promise hence we use .then and .catch
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology:true})
    // Listening at port 3000 only when DB is connected
    .then((result) =>{
        app.listen(3000);
        console.log("Connected to DB")
    })
    .catch(err => console.log(err))

app.set('view engine','ejs');
// if we want to set views folder to some different folder
// app.set('views','htmlFiles')

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true})) //use for POST
app.use(morgan('dev')); //morgan middleware (LOGGER)
app.use(express.json()); //PUT or PATCH Request

//Handling Requests
app.get('/',(req,res) =>{
    res.redirect('/blogs')
});

app.get('/about',(req,res) =>{
    res.render('about',{title: "About" })
});

//blog routes
app.use('/blogs',blogRoutes) // makes the code reusable, so mention here the particular route, it will automatically attach /blogs at the starting of each route in blogRoutes

//404 Page
app.use((req,res) =>{
    res.status(404).render('404',{title:"404"})
});
