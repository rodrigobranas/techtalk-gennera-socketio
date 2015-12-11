var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static("client"));

var users = [];

io.on("connection", function (socket) {

	socket.emit("users", users);

	socket.on("user-connection", function (data) {
		users.push(data);
		io.emit("user-connection", data);
	});

	socket.on("message", function (data) {
		io.emit("message", data);
	});

	socket.on("disconnect", function () {
	});
});

server.listen(process.env.PORT || 3000);