#!/usr/bin/env node

var argv = require('optimist').argv;
var Server = require('./server');
var exec = require('child_process').exec;

var dir = argv._[0];
var test = argv._[1];

var server = new Server(dir);

exec("open -a \"Google Chrome\" \"http://localhost:"+server.port+"/?script="+test+"\"", function(err) {
	if(err) throw err;
});

