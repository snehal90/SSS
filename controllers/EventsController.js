
var event_model = require('../models/events');

exports.getList = function(req, res, callback) {
	event_model.getList(function(list) {
		console.log(list[0], "::::list");
		res.send('this is a event function  ' + JSON.stringify(list));

	});
};

exports.add = function(req, res, callback) {
	var data = {};
	console.log(req.body, "::::req");
	data['name'] = req.body.name;
	data['desc'] = req.body.desc;
	console.log(data, "::::data");
	event_model.add(data, function(ret_data) {
		console.log(ret_data, "::::list");
		res.send('this is a event add function ' + ret_data._id);

	});
};