var cluster = require('cluster');
var numWorkers = require('os').cpus().length;
var express = require('express');
var	app = express();

if(cluster.isMaster) {
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {

    app.get('/', function(req, res) {
		res.send('process ' + process.pid + ' says hello!');
        //process.kill(process.pid);
	})

	app.get('/about', function(req, res) {
		res.send('process ' + process.pid + ' says hello!');
	})

    app.listen(8081, function(request, response) {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });


}
