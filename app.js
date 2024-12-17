const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blog') ;
const mongoose = require('mongoose');



//express app
const app = express();

//connect to mongodb
const dburi = "mongodb+srv://ram:test051724@noderam.5667o.mongodb.net/?retryWrites=true&w=majority&appName=noderam";
mongoose.connect(dburi)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


//register view engine
app.set('view engine','ejs');


//middleware & static

app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog =new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog',
});

blog.save()
    .then((result) => {
    res.send(result)
})
    .catch((err) =>{
        console.log(err);
    });
});

app.get('/all-blogs' , (req, res) => {
    Blog.find()
        .then((result)  => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/single-blog' , (req, res) => {
    Blog.findById('674ecdbef473803c25944f0b')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

});



app.get('/', (req, res) =>{
    const blogs = [
        {title: 'Luffy finds the One Piece', snippet: 'Pirate King'},
        {title: 'Zoro the Swordsman', snippet: 'Right Hand Pirate King'},
        {title: 'Sanji the Chief', snippet: 'Left Hand Pirate King'},
    ];
    res.render('index', {title:'HOME', blogs});
});


app.get('/about', (req, res) =>{ 
    res.render('about',{title:'About Page'});
});

//redirects
app.get('/blogs/create', (req, res) => {
    res.render('create', {title:'Create Page'});
});

//404 page
app.use((req, res) => {
    res.status(400).render('404' , {title:'404 ERROR'});
});
