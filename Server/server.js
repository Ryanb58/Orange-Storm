var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(80);

var chatLog = new Array();

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
  io.sockets.emit('welcome', "Hello everyone!");
  socket.on('my other event', function (data) {
    console.log(data);
  });
	socket.on('sayHello', function (data) {
    console.log(data);
		chatLog.push(data);
		io.sockets.emit('updateChat', data);
  });
});