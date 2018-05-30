var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});

io.on('connection', function(socket) {
   console.log('A user connected');

   setTimeout(function() {
     socket.emit('testEvent',{description: 'jeje'});
  }, 4000);

  socket.on('clientEvent', function(data){
    console.log(data);
  });

socket.on('POSITION', function(msg){console.log(msg.position)});

   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('POSITION', function(msg){
    console.log('pos: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
