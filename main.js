var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));	

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
	
io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('chat message', function(data){
		date = new Date();
		data.timestamp = date.getHours() + ':' + date.getMinutes();
		console.log(data);
		io.emit('chat message', data);
	});

  	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
});

http.listen(3000, function(){
	console.log("listening to *:3000");
});