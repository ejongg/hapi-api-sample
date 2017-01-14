'use strict';

const env = (key) => {
	const env = process.env.NODE_ENV || 'development';

	const config = {
		development: {
			host: 'localhost',
			port:  '8000'
		},
		production: {
			host: process.env.HOST,
			port: process.env.PORT
		}
	}

	return config[env][key];
}

const manifest = {
	connections: [
		{
			host: env('host'),
			port: env('port'),
			routes: {
				cors: true
			},
			router: {
				stripTrailingSlash: true
			}
		}
	],
	registrations: [
		{
			plugin: {
				register: 'hapi-node-postgres',
				options: {
					connectionString: "postgres://postgres:root@localhost/hapi-api",
					attach: "onPreAuth"
				}
			}
		},
		{
			plugin: 'hapi-auth-jwt2'
		},
		{
			plugin: './plugins/auth'
		},
		{
			plugin: {
				register: 'crumb',
				options: {
					restful: true,
					autoGenerate: false
				}
			}
		}
	]
}

module.exports = manifest;