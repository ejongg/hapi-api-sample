'use strict';

var Handlers = require('./handlers');

const routes = (server) => {
	server.route({
		method: 'POST',
		path: '/auth/token/jwt',
		handler: Handlers.Auth.getJWTToken,
		config: {auth: false}
	});

	server.route({
		method: 'GET',
		path: '/auth/token/csrf',
		handler: Handlers.Auth.getCSRFToken,
		config: {auth: false}
	});

	server.route({
		method: 'GET',
		path: '/users',
		handler: Handlers.User.getAll
	});

	server.route({
		method: 'GET',
		path: '/users/{id}',
		handler: Handlers.User.getById
	});
};

module.exports = routes;