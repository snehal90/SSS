var event_model = require('../models/events');

exports.getList = function(req, res, callback) {
	var query = req.query;
	console.log(query, ":::query");

	event_model.getList(function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders.status).send(err.responseParams);
		}
		res.status(ret_data.responseHeaders.status).send(ret_data.responseParams);
	}, query);
};

exports.add = function(req, res, callback) {
	var data = req.body;

	event_model.add(data, function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders.status).send(err.responseParams);
		}
		return res.status(ret_data.responseHeaders.status).send(ret_data.responseParams);
	});
};

exports.update = function(req, res, callback) {
	var unique_id = req.params.unique_id;
	var data = req.body;
	// data['images'] = req.files;

	console.log(req.body, "::::req.body");

	event_model.update(function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders.status).send(err.responseParams);
		}
		delete ret_data.responseParams.data;
		return res.status(ret_data.responseHeaders.status).send(ret_data.responseParams);
	}, data, unique_id);
};