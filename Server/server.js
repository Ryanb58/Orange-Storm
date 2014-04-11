var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

var chatLog = new Array();

//Start server.
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	//Send out initial hello to all connected users.
  io.sockets.emit('welcome', "Hello everyone!");
	
	//Function called via client when a user submits a message.
	socket.on('talk', function (data) {
    console.log(data);
		chatLog.push(data);
		
		//Sends command to client to display the new message.
		io.sockets.emit('updateChat', data);
  });
});