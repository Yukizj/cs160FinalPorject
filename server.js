    
require('dotenv/config');
var http = require('http');
var app = require('./app');
var port = 3000;
var server = http.Server(app);

server.listen(port, function(){
	console.log("server running on port %d", port);
	console.log("________________________________");
	console.log("Running on %s", process.env.NODE_ENV);
});
