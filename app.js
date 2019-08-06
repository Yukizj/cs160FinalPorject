require('dotenv/config');

const express = require('express');
const app = express();


const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
	extended  : false,
}));
app.use(express.static('public'));
app.use(bodyParser.json());

//*****ROUTES*******
// app.get('/', (req, res) => res.send('Hello World!'));
app.get('/', function(req, res, next) {  
    res.status(200).sendFile(path.join(__dirname, '/public/index.html'));
});


app.use(function(err,req,res,next){
	//error handling 
	if (err){
		next(err);
	}
	else{
		var error = new Error('Not found');
		error.status = 404;
		next(error);
	}
});

app.use(function(error,req,res,next){
	res.status(error.status || 500);
	res.json({
		error: error
	});	
});
	


module.exports = app;
