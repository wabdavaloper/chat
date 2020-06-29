var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var helmet = require('helmet');
var arr = require(__dirname + '/modules/main');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(function logger(req,res,next){
   console.log(req.ip, req.method, req.url);
   next();
});

app.use(helmet());
app.use(express.static('public'));

app.get('/', function(req,res){
	res.statusCode = 200;
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('connected new user: ' + socket.id);

	socket.on('sendMsg', function(data){
		console.log(data);
		io.emit('returnMsg',data);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected: ' + socket.id);
	});
});

app.post('/', function(req,res){
	console.log(req.body.text);
});

http.listen(process.env.PORT || 1337, function(){
	console.log('server started...');
});

process.on('SIGIN', function(code){
	console.log('got ctrl+c');
});

process.on('uncaughtException', function(err){
	console.log(err);
});
