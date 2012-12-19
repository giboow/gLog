exports.index = function(req, res){

	console.log(global.config);

  	res.render('index/index', {
  		title: 'Express',
  		//directories: directories
  	});
};