const secret = require('../config/secret');

module.exports.register = function(server, options, next) {
	server.auth.strategy('jwt', 'jwt', {
		key: secret,
		verifyOptions: {
			algorithms: ['HS256']
		},
		validateFunc: (decoded, request, callback) => {
			// Just a demo validate function. Only checks if the decoded id is present in db.
			request.pg.client.query('SELECT * FROM users WHERE id = $1::int', [decoded], function(err, result) {
				if (err) throw err;

				if (result.rowCount > 0) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			});
		}
	});

	server.auth.default('jwt');

	next();
};

module.exports.register.attributes = {
	name: 'auth'
}