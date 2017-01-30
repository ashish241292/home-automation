import { version } from '../../package.json';
import { Router } from 'express';
import config from '../config.json';
let socket;
socket = require('socket.io-client')(config.pi_url);

export default ({ config, db }) => {
	let api = Router();

	api.get('/', (req, res) => {
        socket.emit('hello', "hello! @Pi are you ready?");
        res.json({version});
	});

	api.get('/bulb/:state', (req, res) => {
				console.log("ebulb","=>user=> Hello electric bulb set to "+ req.params.state);
        socket.emit("ebulb", req.params.state);
        res.json({version});
	});

	return api;
}
