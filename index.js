
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/chatroom.html');
});


app.get('/chatting.html', function(req, res){
  res.sendFile(__dirname + '/chatting.html');
});




io.on('connection', function(socket){

    console.log('a user connected');
 
	db.open(function() {
	
		db.collection('chatting', function(err, collection) {
	    
	    socket.on('chat message', function(msg){
	
			collection.insert({
			    message: msg,
			}, function(err, data) {
			    if (data) {
			        console.log('Successfully Insert:'+msg);
			    } else {
			        console.log('Failed to Insert:'+msg);
			    }
			});
	  	io.emit('chat message', msg);
	    });

	    socket.on('history message', function(his){
		   db.chatting.find({}, function(err, users) {
		  if( err || !users) console.log("No users found");
		  else users.forEach( function(femaleUser) {
		    console.log("!!!");
		  } );
		});


		});

		});

	});

});


http.listen(3000, function(){
  console.log('listening on *:3000');

});