
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongo = require('mongodb').MongoClient;

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
    // mongo.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI, function (err, db) {
    //         var collection = db.collection('chat messages');
    //         collection.insert({ content: msg }, function (err, o) {
    //             if (err) { console.warn(err.message); }
    //             else { console.log("chat message inserted into db: " + msg); }
    //         });
    //         });
  	io.emit('chat message', msg);
  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
