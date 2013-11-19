requirejs.config({
	baseUrl:'js',
	paths:{
		'socket.io':'/socket.io/socket.io'
	}
});

requirejs(['socket.io'],
function (){
	var socket = io.connect('http://localhost');

	socket.on('whois',function(){
		var r =socket.emit('iam',{ name: navigator.userAgent });
	});

	socket.on('announcement',function(text){
  		console.log(text);
	});
});
