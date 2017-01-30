import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let app = express();

app.server = http.createServer(app);

let io;
io = require('socket.io')(app.server);

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

io.on('connection', function(socket){
    console.log('pi-server-connected : OK!');
    socket.on('hello', function(msg){
        console.log('message recived from pi :-> ' + msg);
    });
    socket.on('ebulb', function(msg){
        console.log('message recived from pi :-> ' + msg);
    });
		socket.on('disconnect', function(){
    		console.log('Pi got disconnected! no.. ):');
  	});

});

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port);

	console.log(`Magic happens on port ${app.server.address().port}`);

});

export default app;
