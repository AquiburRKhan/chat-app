var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(__dirname + '/public'));

io.on('connection', function(){
console.log('working');
});


app.get('*', function(req, res) {
  console.log("came here");
  res.sendFile('./public/index.html');
});


server.listen(3000,function(){
  console.log('started');
});
