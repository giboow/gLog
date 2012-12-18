var routes = require('./routes/index'),
log = require('./routes/log');


module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/log', log.index);
	app.get('/log/list', log.list);
}