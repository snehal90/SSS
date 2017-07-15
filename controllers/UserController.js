var user_model = require('../models/user');

exports.login = function(req, res, callback) {
	console.log('in login....');
	user_model.getUser(function(err, ret_data) {
		console.log(ret_data, ":::::ret_data");
		if(err) {
			res.set(err.responseHeaders);
			return res.status(err.responseHeaders.status).send(err.responseParams);
		}
		res.set(ret_data.responseHeaders);
		return res.status(ret_data.responseHeaders.status).send(ret_data.responseParams);
		
	}, req.body);

	console.log('after login....');
};