var Checkit = require('checkit');
var moment = require('moment');
var moment_tz = require('moment-timezone');
var event_model = require('../models/events');
var errorCodes = require('../config/error');

exports.getList = function(req, res, callback) {

	event_model.getList(function(list) {
		console.log(list[0], "::::list");
		res.send(list);
	});
};

exports.add = function(req, res, callback) {
	var data = {};
	Checkit.Validator.prototype.datetime = function(val, with_time) {
		// console.log(moment_tz.tz.guess(), ":::tz");
		var dt_moment = moment(val, 'MM/DD/YYYY HH:mm', true);
		var dt_val = dt_moment.format('MM/DD/YYYY HH:mm');
		var curernt_val = moment().format('MM/DD/YYYY HH:mm');
		var dt_timestamp = dt_moment.valueOf();
		var current_timestamp = moment().valueOf();
		// console.log(moment(val, 'MM/DD/YYYY HH:mm').utc().format('MM/DD/YYYY HH:mm'), ":::UTC date");

		if(!dt_moment.isValid()) {
			throw new Error('The date is invalid.');
		}

		if(with_time == 1 && dt_timestamp < current_timestamp) {
			throw new Error('The date should not be before current date');
		}
	}
	var checkit = new Checkit({
		name : [
			{
				rule : 'required',
				message : 'Please provide the name of event'
			},
			{
				rule : 'string',
				message : 'The name of event must be a string'
			},
		],
		start_date : [
			{
				rule : 'required',
				message : 'Please provide the start datetime of event'
			},
			{
				rule : 'datetime:1'
			}
		],
		end_date : [
			{
				rule : 'required',
				message : 'Please provide the start datetime of event'
			},
			{
				rule : 'datetime:1'
			}
		],
		type : {
			rule : 'required',
			message : 'Please provide the type of event'
		}
	});

	var body = {
		name : req.body.name,
		start_date : req.body.start_date,
		end_date : req.body.end_date,
		type : req.body.type
	};

	checkit.run(body).then(function(validated) {
		var start_date_timestamp = moment(req.body.start_date, 'MM/DD/YYYY HH:mm', true).valueOf();
		var end_date_timestamp = moment(req.body.end_date, 'MM/DD/YYYY HH:mm', true).valueOf();

		if(start_date_timestamp > end_date_timestamp) {
			var error = errorCodes.error_400.custom_invalid_params;
			error.responseParams.message = 'The end date should not be before start date';
		  	res.status(error.responseHeaders).send(error.responseParams);
		}

	// 	console.log(validated, "::validated");
	// 	// data['name'] = req.body.name;
	// 	// data['desc'] = req.body.desc;
	// 	// console.log(data, "::::data");
	// 	// event_model.add(data, function(ret_data) {
	// 	// 	console.log(ret_data, "::::list");
	// 	// 	res.send('this is a event add function ' + ret_data._id);

	// 	// });
	}).catch(Checkit.Error, function(err) {
		var error = errorCodes.error_400.custom_invalid_params;
		error.responseParams.message = err.toJSON();
		// res.status()
	  	res.status(error.responseHeaders).send(error.responseParams);
	})
};