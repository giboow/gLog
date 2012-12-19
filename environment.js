path = require('path');

module.exports = function(app, express){
	var expressLayouts = require('express-ejs-layouts')


	app.configure(function(){
	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');

	  app.set('view engine', 'ejs');
	  app.set('layout', 'layouts/default');
	  app.set("layout extractScripts", true)
	  app.use(expressLayouts);

	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.cookieParser('your secret here'));
	  app.use(express.session());
	  app.use(app.router);
	  app.use(require('stylus').middleware(__dirname + '/public'));
	  app.use(express.static(path.join(__dirname, 'public')));
	});

	app.configure('development', function(){
	  app.use(express.errorHandler());
	});
}