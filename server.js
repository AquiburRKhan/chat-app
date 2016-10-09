var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");

dbConnect = require('./app/config.js');

dbConnect();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));


require('./app/routes')(app);

io.on('connection', function(socket) {
    console.log('socket connected');
    socket.on('send message', function(messageDetails) {
      console.log(messageDetails);
       io.emit('get message', messageDetails);
    })
});

server.listen(3000, function() {
    console.log('started');
});
