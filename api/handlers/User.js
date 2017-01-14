'use strict';

module.exports = {
	getAll: function(request, reply) {
		request.pg.client.query('SELECT * FROM users', [], function(err, result) {
			if (err) throw err;

			reply(result.rows);
		});
	},

	getById: function(request, reply) {
		request.pg.client.query('SELECT * FROM users WHERE id = $1::int', [request.params.id], function(err, result) {
			if (err) throw err;

			reply(result.rows[0]);
		});
	}
}