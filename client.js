var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var ioClient = require('socket.io-client').connect("http://localhost:3001", {
  transports: ['websocket'],
  'force new connection': true
});
console.log(ioClient.socket.connect());

server.listen(8081);

if (process.argv[2] != undefined){
   filename = process.argv[2];
   if (!path.existsSync(filename)){
      throw(filename + ' does not exists');
   }
}
else {
   filename = 'log.out'
}

var spawn = require('child_process').spawn;
var tail = spawn('tail', ['-f', filename]);

tail.stdout.on('data', function (data) {
  console.log(data.toString('utf8'));
  ioClient.send(data.toString('utf8'));
});
