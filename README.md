gLog
===========
Log Tracker

Requirements
Nodejs and npm installed, refer to http://nodejs.org/

Setup
# git@github.com:giboow/gLog.git
# cd gLog
# npm install

Update config file to track log files or directories
File exemple :
config.logs = {};
config.logs.log = "./log";
config.logs.test = "./log.test";
config.logs.out = "./log.out";

Running
#node app
or
#npm start

Access http://localhost:3000

