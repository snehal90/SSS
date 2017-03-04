var event_model = require('../models/events');

exports.getList = function(req, res, callback) {
	var query = req.query;

	event_model.getList(function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders).send(err.responseParams);
		}
		console.log(ret_data, "::::ret_data");
		res.status(ret_data.responseHeaders).send(ret_data.responseParams);
	}, query);
};

exports.add = function(req, res, callback) {
	var data = req.body;
	data['images'] = req.files;
	event_model.add(data, function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders).send(err.responseParams);
		}
		// console.log(ret_data, "::::list");
		return res.status(ret_data.responseHeaders).send(ret_data.responseParams);
	});
};