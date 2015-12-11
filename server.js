var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static("client"));

io.on("connection", function (socket) {
	console.log("conection");

	socket.on("message", function (data) {
		io.emit("message", data);
	});

	socket.on("disconnect", function () {
		console.log("disconnect");
	});
});

server.listen(process.env.PORT || 3000);