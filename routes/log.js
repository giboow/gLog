exports.index = function(req, res){


};

exports.list = function(req, res) {
	var config = global.config
	res.send(config.logs);
}


exports.get = function(req, res) {

	console.log(req);
	res.send("respond with a resource");
	return;
	var spawn = require('child_process').spawn;
	var tail = spawn('tail', ['-f', filename]);

	tail.stdout.on('data', function (data) {
	  console.log(data.toString('utf8'));
	  ioClient.send(data.toString('utf8'));
	});
}