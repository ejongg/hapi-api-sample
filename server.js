'use strict';

const Hapi = require('hapi');
const Glue = require('glue');
const Routes = require('./api/routes');
const Manifest = require('./config/manifest');

let server = new Hapi.Server();

Glue.compose(Manifest, { relativeTo: __dirname }, function(err, server) {

	Routes(server);

	server.start(function(err) {
		if (err) throw err;

		console.log(`App running at: ${server.info.uri}`);
	});
});