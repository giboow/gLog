module.exports = function(app) {
	var http = require('http'),
		server = http.createServer(app).listen(3001),
		io = require('socket.io').listen(server),
		os = require("os"),
		hostname = os.hostname();

	var logs = global.config.logs;

	var cp = require('child_process');
	for(var log in logs) {
		var filename = logs[log];
		var n = cp.fork(__dirname + '/childProcessTail.js', [filename, log]);
		n.on('message', function(m) {
			io.sockets.emit('newLog', {
	 			hostname : hostname,
	 			log : m.log,
	 			filename: m.filename,
	 			data : m.data,
 			});
		});
	}

	/*var tails = {};
	for(var log in logs) {
		var spawn = require('child_process').spawn;
		var filename = logs[log];
		var env = process.env;
		env.filename = filename;
		env.log = log;
		tail = spawn('tail', ['-f', '-n 1', filename], {env: env});


		tail.stdout.on("data", function(data) {
			io.sockets.emit('news', {
	 			hostname : hostname,
	 			log : process.env.log,
	 			filename: process.env.filename,
	 			data : data.toString('utf8'),
 			});
		});
	}*/
}