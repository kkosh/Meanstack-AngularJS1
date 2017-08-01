//npm install express --save : npm start server.js : npm install -g nodemon : nodemon server.js
var express = require('express');

//invoke express 
var app = express();

//tells use 8080 server and is there environment which use other server ; use 8080 instead
var port = process.env.PORT || 8080;

//shows log into cmd, for every request it gets log : npm install morgan --save
var morgan = require('morgan');

//handler for mango db : npm install mangoose --save : 
var mongoose = require('mongoose');


//parse data into json : npm install body-parser --save
var bodyParser = require('body-parser');


//get an instance of router
var router = express.Router();

//tells app that use router object with this route
var appRoutes = require('./backend/routes/api')(router);

//to join path
var path = require('path');

//dev is color-coded method for morgan
app.use(morgan('dev'));

//for parsing app json
app.use(bodyParser.json()); 

//for parsing app url encoded
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(__dirname + '/public'));

//before this route looks like localhost:8080/users : after then it looks like localhost:8080/api/users(for backend) so it will not conflict with angular path 
app.use('/api', appRoutes);


//mangoose api : loginDB = database name
mongoose.connect('mongodb://localhost:27017/loginDB', function (Error) {
    
    if (Error) {
        console.log("not connected to database : " + Error);
    
    }
    else
        {
            console.log("connection done");
        }
});

// routing to any page
app.get('*', function (req, res) {
    
    //__dirname : takes current path and join this path
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
    
});


//start the server
app.listen(port, function () {
    console.log("running server..." + port);
});