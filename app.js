
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var manager = require('./engine/manager');

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

mansger.start(server)


