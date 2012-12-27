var path = require('path');
var fs = require('fs');
var filename = path.resolve(process.argv[2]);
var log = process.argv[3];
fs.lstat(filename, function(err, stats){
	if(!err) {
		if (stats.isFile()) {
			fileProcess(filename);
		} else if (stats.isDirectory()) {
			dirProcess(filename);
		}
	} else {
		throw filename + " : Fichier ou dossier inexistant";
	}
});


/**
 * Watch file changes
 */
function fileProcess(filename) {
	var spawn = require('child_process').spawn;
	var tail = spawn('tail', ['-f', '-n 1', filename]);
	tail.stdout.on('data', function (data) {
		process.send({
	 		log : log,
	 		filename: filename,
		 	data : data.toString('utf8'),
	 	});
	});
}

/**
 * Watch direcory files changes
 */
function dirProcess(filename) {
	var watchTree = require("fs-watch-tree").watchTree;
	var last = {};
	var watch = watchTree(filename, function (event) {
		if(event.isModify()) {
			require('child_process').exec('tail -n 1 '+event.name, function(error, stdout, stderr){
				var file = event.name;
				if(stdout != last[event.name]) {
					process.send({
				 		log : log,
				 		filename: file,
					 	data : stdout,
				 	});
				 	last[file] = stdout;
			 	}
			});
		}
	});
}
