var express = require('express');
var joules = require('joules');
var path = require('path');
var engines = require('consolidate');
var fs = require('fs');

function TestServer(dir) {

	dir = this.dir = path.resolve(dir);

	var app = this.app = express();

	app.engine('html', engines.hogan);

	// expose everything to the client
	app.use(express.static(dir));
	joules.hint(dir, function(err) {
		if(err) {
			throw err;
		}
	});

	app.get('/mocha.js', function(req, res) {

		fs.readFile(__dirname + '/node_modules/mocha/mocha.js', function(err, mocha) {
			if(err) throw err;

			res.type('text/javascript');

			res.send(mocha);
		});
	});

	app.get('/mocha.css', function(req, res) {

		fs.readFile(__dirname + '/node_modules/mocha/mocha.css', function(err, mocha) {
			if(err) throw err;

			res.type('text/css');

			res.send(mocha);
		});
	});

	app.get('/joules.js', function(req, res) {

		fs.readFile(__dirname + '/node_modules/joules/joules.js', function(err, joules) {
			if(err) throw err;

			res.type('text/javascript');

			res.send(joules);
		});
	});

	app.get('/chai.js', function(req, res) {

		fs.readFile(__dirname + '/node_modules/chai/chai.js', function(err, joules) {
			if(err) throw err;

			res.type('text/javascript');

			res.send(joules);
		});
	});

	// display our index file for the root
	app.get('/', function(req, res) {
		res.render(__dirname + '/test.html', {
			script: req.query.script
		});
	});


	var port = this.port = Math.round((Math.random() * 1000) + 3000);

	app.listen(port);
	console.log("test server running on "+port);

	return this;
}

module.exports = TestServer;