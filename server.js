var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");
var users = {};
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
       io.sockets.connected[users[messageDetails.to]].emit('get message', messageDetails);
    });
    socket.on('user login', function(user) {
        users[user.username] = socket.id;
        console.log(users);
        io.sockets.emit('new user');
    });
    socket.on('user logout', function(user) {
        delete users[user.username]
        console.log(users);
        io.sockets.emit('user left');
    });
});

server.listen(3000, function() {
    console.log('started');
});
