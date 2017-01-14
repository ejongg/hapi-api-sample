'use strict';

const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');

module.exports = {
	getJWTToken: function(request, reply) {
		let email = request.payload.email;
		let password = request.payload.password;

		request.pg.client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], 
			function(err, result) {
				if (err) throw err;

				if (result.rowCount === 0) {
					reply('User not found')
				} else {
					let user = result.rows[0];
					const token = jwt.sign(user.id, secret, {}, {expiresIn: '12h'});

					reply(token);
				}
			}
		);	
	},
	getCSRFToken: function(request, reply) {
		reply({crumb: request.server.plugins.crumb.generate(request, reply)});
	}
};