var app = require("http").createServer(serv_handle);
var fs = require("fs");
var io = require("socket.io").listen(app);

app.listen(9000);

io.sockets.on("connection", function(socket){
	fs.watch("logs.txt", function(curr, prev){
		fs.readFile("logs.txt", "utf-8", function(err, data){
			socket.emit("resp", data);
		});
	});
});

function serv_handle(req, res){
	fs.readFile( __dirname + '/client.html' ,function (err, data) {
		if (err) {
			res.writeHead(500, {"content-type" : "text/html"});
			return res.end(err);
		}
		return res.end(data, "utf-8");
	});
}

