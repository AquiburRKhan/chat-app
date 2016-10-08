var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


server.listen(3000,function(){
  console.log('started');
});

io.on('connection', function(){
console.log('working');
});


app.post('/login', function(req, res) {
  var k = req.body;
  console.log(k.username);
  res.end();
});

app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});
