var events = db.collection('events');

var Checkit = require('checkit');
var moment = require('moment');
var moment_tz = require('moment-timezone');
var slug = require('slug');
var moment = require('moment');
var errorCodes = require('../config/error');
var _ = require('underscore');
var gallery = require('../models/gallery');

var file_helper_obj = require('../helpers/file_helper');

// const EVENT_TYPE = ['upcoming', 'past'];

//date validation
Checkit.Validator.prototype.datetime = function(val, with_time) {
	// console.log(moment_tz.tz.guess(), ":::tz");
	var dt_moment = moment(val, 'DD-MM-YYYY HH:mm', true);
	var dt_val = dt_moment.format('DD-MM-YYYY HH:mm');
	var curernt_val = moment().format('DD-MM-YYYY HH:mm');
	var dt_timestamp = dt_moment.valueOf();
	var current_timestamp = moment().valueOf();
	// console.log(moment(val, 'MM/DD/YYYY HH:mm').utc().format('MM/DD/YYYY HH:mm'), ":::UTC date");

	if(!dt_moment.isValid()) {
		throw new Error('The date is invalid.');
	}

	if(with_time == 1 && dt_timestamp < current_timestamp) {
		throw new Error('The date should not be before current date');
	}
};

//event type enum validation
// Checkit.Validator.prototype.eventType = function(val) {
// 	if(_.indexOf(EVENT_TYPE, val) === -1) {
// 		throw new Error('Invalid event type provided');
// 	}
// };

//add new event
exports.add = function(data, callback) {
	var checkit = new Checkit({
		name : [
			{
				rule : 'required',
				message : 'Please provide the name of event'
			},
			{
				rule : 'string',
				message : 'The name of event must be a string'
			}
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
		// type : [
		// 	{
		// 		rule : 'required',
		// 		message : 'Please provide the type of event'
		// 	},
		// 	{
		// 		rule : 'eventType'
		// 	}
		// ],
		content : {
			rule : 'required',
			message : 'Please provide the content of event'
		}
	});

	var body = data;

	checkit.run(body).then(function(validated) {
		var start_date_timestamp = moment(data['start_date'], 'DD-MM-YYYY HH:mm', true).valueOf();
		var end_date_timestamp = moment(data['end_date'], 'DD-MM-YYYY HH:mm', true).valueOf();

		getList(function(err, result_dt) {
			if(err) {
				callback(err)
	  			return false;
			} else {
				if(result_dt.responseParams.data.length > 0) {
					var errors = errorCodes.error_200.duplicate;
					errors.responseParams.message = 'The event name already exists';
					callback(errors);
		  			return false;
				}

				if(start_date_timestamp > end_date_timestamp) {
					var error = errorCodes.error_400.custom_invalid_params;
					error.responseParams.message = 'The end date should not be before start date';
				  	callback(error);
				  	return false;
				}
				data['slug'] = slug(data['name']);
				data['unique_id'] = 'EVENTS_' + moment().valueOf();
				data['created_at'] = data['updated_at'] = moment().utc().format();
				data['created_by'] = data['updated_by'] = 'admin@gmail.com';
				data['is_active'] = !data['is_active'] ? 1 : data['is_active'];
				data['content_type'] = 'EVENT';

				gallery_list = [];
				if(data['images'].length != 0) {
					file_helper_obj.uploadImages(data['images'], 'EVENT', function(err, res_dt) {
						if(err) { 
							callback(err);
						} else {
							data['images'] = res_dt['images_list'];
							gallery_list = res_dt['gallery_list'];

							save(data, gallery_list, 0, callback);
						}
					});
				} else {
					save(data, gallery_list, 0, callback);
				}
			}
		}, {'name' : data['name']});


	}).catch(Checkit.Error, function(err) {
		var error = errorCodes.error_400.custom_invalid_params;
		error.responseParams.message = err.toJSON();
	  	callback(error);
	})


};

function save (data, gallery_list, is_update, callback) {
	if(is_update == 0) {
		events.insert(data, {}, function(err, dt) {
			if(err) {
				var error = errorCodes.error_403.server_error;
				callback(error);
			} else {
				if(gallery_list.length != 0) {
					gallery.save(gallery_list, function() {});
				}
				var result_response = errorCodes.error_200.success;
				result_response.responseParams.data = dt;
				callback(null, result_response);
			}
		});
	}
}

function getList(callback, query) {
	var qry = {};
	var select_query = {};
	var sort = {'start_date' : -1};

	var non_qry_keys = ['sort', 'limit', 'offset', 'page'];

	if(query != undefined) {
		// var splitted_qry = query.split('&');
		for(var i in query) {
			// console.log(i, "::::key")
			if(_.indexOf(non_qry_keys, i) == -1) {
				var val = query[i].split(',');
				qry[i] = {'$in' : val};
			} else if(i == 'sort') {
				sort = JSON.parse(query[i]);
			}
		}
	}
	console.log(qry, "::::qry")
	console.log(typeof sort, "::::sort")
	// return false;
	events.find(qry, select_query).sort(sort).toArray(function (err, list) {
		if(err) {
			var error = errorCodes.error_403.server_error;
			callback(error);
		} else {
			var res_dt = errorCodes.error_200.success;
			res_dt.responseParams.data = list;
			callback(null, res_dt);
		}
	});
}

exports.getList = getList;

function getCount(query, callback) {
	events.count(query, function (err, list) {
		if(err) {
			var error = errorCodes.error_403.server_error;
			callback(error);
		} else {
			var res_dt = errorCodes.error_200.success;
			res_dt.responseParams.count = list;
			callback(null, res_dt);
		}
	});
};

exports.getCount = getCount;
