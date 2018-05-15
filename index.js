const session = require("cookie-session");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

// Initialize app
const app = express();

// Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// Middleware called everytime a request is sent to the server
app.use(session({secret:'1000000'}));
app.use(urlencodedParser);

app.use(function(req, res, next) {
    if(!req.session.todoapp){
           req.session.todoapp = [] ;
         }
    next();
});

// Landing page
app.get('/', function(req,res, next){
    res.render('index', {data: req.session.todoapp});
    next();
});

// Adding to List - Handler
app.post('/todo/add', urlencodedParser, function(req, res){

    if(req.body.task !=''){
    req.session.todoapp.push(req.body.task);

    }
    // Redirect back to landing page
    res.redirect('/');

});

app.get('/todo',function(req,res){
    res.send('ToDo');
});

// Deleting from list - Handler
app.get('/todo/delete/:id',function(req,res){
    var id = req.params.id;

     if(id){
         // Removing selected id
         req.session.todoapp.splice(id, 1);
     } 
    res.redirect('/');
});

app.listen(8080);