var event_model = require('../models/events');

exports.getList = function(req, res, callback) {
	var query = req.query;

	event_model.getList(function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders).send(err.responseParams);
		}
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
		return res.status(ret_data.responseHeaders).send(ret_data.responseParams);
	});
};

exports.update = function(req, res, callback) {
	var slug = req.params.slug;
	var data = req.body;
	data['images'] = req.files;

	event_model.update(function(err, ret_data) {
		if(err) {
			return res.status(err.responseHeaders).send(err.responseParams);
		}
		delete ret_data.responseParams.data;
		return res.status(ret_data.responseHeaders).send(ret_data.responseParams);
	}, data, slug);
};