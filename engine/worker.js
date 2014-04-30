var io = require('socket.io-client');

var Worker = (function () {
	var wrk = function () {
		var self = this;
		this.socket = io.connect('127.0.0.1:3000');
		this.socket.on('connect', function () { console.log('socket connected'); });
		this.socket.on('identify', function () { socket.emit('worker', null); });
		//gets a code package for future execution
		this.socket.on('code', function () { });
		//get some data to work with
		this.socket.on('workload', function () { });
	}

	return wrk;
})();

exports.start = function () {
	
}