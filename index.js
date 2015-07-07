
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
	// mongo.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
 //        var collection = db.collection('chat messages')
 //        var stream = collection.find().sort({ _id : -1 }).limit(10).stream();
 //        stream.on('data', function (chat) { socket.emit('chat', chat); });
 //    });


		
  socket.on('chat message', function(msg){
     	/* open db */
		db.open(function() {
		    /* Select 'contact' collection */
		    db.collection('chatting', function(err, collection) {
		        /* Insert a data */
		        collection.insert({
		        	user:"",
		            message: msg,
		         
		        }, function(err, data) {
		            if (data) {
		                console.log('Successfully Insert');
		            } else {
		                console.log('Failed to Insert');
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
