var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tot_con = 0;

app.use(express.static('public'));	

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
	
io.on('connection', function(socket){
	tot_con++;
	console.log('Total Users connected: '+tot_con);
	io.emit('tot_users', tot_con);

	socket.on('chat message', function(data){
		date = new Date();
		data.timestamp = date.getHours() + ':' + date.getMinutes();
		console.log(data);
		io.emit('chat message', data);
	});

  	socket.on('disconnect', function(){
  		tot_con--;
  		console.log('Total Users remaining: '+tot_con);
	  	io.emit('tot_users', tot_con);
  	});
});

http.listen(process.env.PORT || 5000, function(){
	console.log("listening to *:5000");
});