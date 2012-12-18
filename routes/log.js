exports.index = function(req, res){

  	res.send("respond with a resource");
};

exports.list = function(req, res) {
	var config = global.config
	res.send(config.logs);
}