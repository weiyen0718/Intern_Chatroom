
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
    socket.on('disconnect', function () {
        console.log('a user disconnected');
    });
	


    socket.on('chat message', function(msg){
     	/* open db */
		db.open(function() {
		    /* Select 'contact' collection */

		    db.collection('chatting', function(err, collection) {
		        /* Insert a data */	
		        collection.insert({
		            message: msg
		         
		        }, function(err, data) {
		            if (data) {
		                console.log('Successfully Insert:'+msg);
		            } else {
		                console.log('Failed to Insert:'+msg);
		            }
		        });
		    });
		});
  	io.emit('chat message', msg);
  });


});


http.listen(3000, function(){
  console.log('listening on *:3000');

});