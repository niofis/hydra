var socket_io = require('socket.io');

var workers = {};

exports.start = function (server) {
 
	var io = socket_io.listen(server, { log: false });

	function sendAnnouncement() {
		io.sockets.emit('announcement',
	  		"Current workers: " + 
	  		Object.keys(workers).length)
	}

	io.sockets.on('connection', function (socket) {
	  socket.emit('identify');
	  socket.on('worker',function(data){
	  	data.socket=socket;
	  	workers[socket.id]=data;
	  	sendAnnouncement();
	  });
	  socket.on('disconnect',function(){
	  	delete workers[socket.id];
	  	sendAnnouncement();
	  });
	});
}