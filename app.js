
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/' });

var app = express();

app.engine('html', ectRenderer.render);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', 
	function(req,res,next){
		res.render("index.html");
	}
);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var workers={};

var io = require('socket.io').listen(server, { log: false });

function sendAnnouncement() {
	io.sockets.emit('announcement',
  		"Current workers: " + 
  		Object.keys(workers).length)
}

io.sockets.on('connection', function (socket) {
  socket.emit('whois');
  socket.on('iam',function(data){
  	data.socket=socket;
  	workers[socket.id]=data;
  	sendAnnouncement();
  });
  socket.on('disconnect',function(){
  	delete workers[socket.id];
  	sendAnnouncement();
  });
});