var events = db.collection('events');

var Checkit = require('checkit');
var moment = require('moment');
var moment_tz = require('moment-timezone');
var slug = require('slug');
var moment = require('moment');
var errorCodes = require('../config/error');
var _ = require('underscore');
var gallery = require('../models/gallery');
var async = require('async');

var file_helper_obj = require('../helpers/file_helper');

// const EVENT_TYPE = ['upcoming', 'past'];

//date validation
Checkit.Validator.prototype.datetime = function(val, with_time) {
	// console.log(moment_tz.tz.guess(), ":::tz");
	var dt_moment = moment(val, 'YYYY-MM-DD HH:mm', true);
	var dt_val = dt_moment.format('YYYY-MM-DD HH:mm');
	var curernt_val = moment().format('YYYY-MM-DD HH:mm');
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
		var start_date_timestamp = moment(data['start_date'], 'YYYY-MM-DD HH:mm', true).valueOf();
		var end_date_timestamp = moment(data['end_date'], 'YYYY-MM-DD HH:mm', true).valueOf();
		if(start_date_timestamp > end_date_timestamp) {
			var error = errorCodes.error_400.custom_invalid_params;
			error.responseParams.message = 'The end date should not be before start date';
		  	callback(error);
		  	return false;
		}

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

				data['slug'] = slug(data['name']);
				data['unique_id'] = 'EVENTS_' + moment().valueOf();
				data['created_at'] = data['updated_at'] = moment().format();
				data['start_date'] = moment(data['start_date'], 'YYYY-MM-DD HH:mm', true).format();
				data['end_date'] = moment(data['end_date'], 'YYYY-MM-DD HH:mm', true).format();
				data['created_by'] = data['updated_by'] = 'admin@gmail.com';
				data['is_active'] = !data['is_active'] ? 1 : data['is_active'];
				data['content_type'] = 'EVENT';

				gallery_list = [];
				if(data['gallery'] != undefined && data['gallery'].length != 0) {
					gallery_list = data['gallery'];
				}
				
				delete data['gallery'];
				save(data, gallery_list, 0, callback);
			}
		}, {'name' : data['name']});


	}).catch(Checkit.Error, function(err) {
		var error = errorCodes.error_400.custom_invalid_params;
		error.responseParams.message = err.toJSON();
	  	callback(error);
	})
};

function setTypeVal(data) {
	var start_date_timestamp = moment(data['start_date']).valueOf();
	var end_date_timestamp = moment(data['end_date']).valueOf();
	var current_timestamp = moment().valueOf();

	var type = 'past';
	if(current_timestamp < start_date_timestamp && current_timestamp < end_date_timestamp) {
		type = 'upcoming';
	}

	return type;
}

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

				dt.type = setTypeVal(dt);
				result_response.responseParams.data = dt;
				callback(null, result_response);
			}
		});
	} else {
		events.update(data.condition, data.update, function(err, dt) {
			console.log(err, ":::err");
			if(err) {
				var error = errorCodes.error_403.server_error;
				callback(error);
			} else {
				if(gallery_list.length != 0) {
					gallery.save(gallery_list, function() {});
				}
				var result_response = errorCodes.error_200.success;
				callback(null, result_response);
			}
		});
	}
}

function getList(callback, query) {
	var qry = {};
	var select_query = {};
	var sort = {'start_date' : -1};
	var page = 1;
	var limit = 2; //20;

	var qry_keys = ['name', 'slug', 'start_date', 'end_date', 'type', 'date', 'unique_id', 'is_active'];

	if(query != undefined) {
		for(var i in query) {
			if(_.indexOf(qry_keys, i) != -1) {
				if(i == 'name') {
					qry[i] = {'$regex' : query[i]};
				} else if(i == 'slug' || i == 'unique_id') {
					var val = query[i].split(',');
					qry[i] = {'$in' : val};
				} else if(i == 'start_date') {
					console.log(query[i], ":::::query[i]");
					qry[i] = {'$gte' : moment(query[i]).format()};
				} else if(i == 'end_date') {
					console.log(query[i], ":::::query[i]");
					qry[i] = {'$lte' : moment(query[i]).format()};
				} else if(i == 'date') {
					var val = query[i].split(',');
					qry['start_date'] = {'$gte' : moment(val[0]).format()};
					qry['end_date'] = {'$lte' : moment(val[1]).format()};
				} else if(i == 'type') {
					if(query[i].toLowerCase() == 'upcoming') {
						qry['start_date'] = {'$gt' : moment().format()};
						qry['end_date'] = {'$gt' : moment().format()};
					} else if(query[i].toLowerCase() == 'past') {
						qry['start_date'] = {'$lt' : moment().format()};
						qry['end_date'] = {'$lt' : moment().format()};
					}
				} else if(i == 'is_active') {
					qry[i] = parseInt(query[i], 10);
				}
			} else if(i == 'sort') {
				sort = JSON.parse(query[i]);
			} else if(i == 'page') {
				page = parseInt(query[i], 10);
			} else if(i == 'limit') {
				limit = parseInt(query[i], 10);
			}
		}
	}

	var offset = (parseInt(page, 10) - 1) * limit;
	console.log(query, ":::query");
	console.log(qry, ":::qry");
	async.parallel([
		function(cb1) { //get query result
			events.find(qry, select_query).sort(sort).limit(limit).skip(offset).toArray(function (err, list) {
				if(err) {
					var error = errorCodes.error_403.server_error;
					callback(error);
				} else {
					for(var x in list) {
						list[x].type = setTypeVal(list[x]);
					}
					cb1(null, {'data' : list});
				}
			});
		},
		function(cb2) { //get total count
			getCount(qry, function (err, res_dt2) {
				if(err) {
					callback(err);
				} else {
					var count = res_dt2.responseParams.count;
					var reminder = parseInt(count / limit, 10);
					var page_count = count % limit == 0 ? reminder : (reminder + 1);

					var cb2_dt = {
						'meta' : {
							'count' : count,
							'page_count' : page_count,
							'page' : page,
							'limit' : limit
						}
					};
					cb2(null, cb2_dt);
				}
			});
		}
	], function(err, result) {
		if(err) {
			callback(err);
		} else {
			var res_dt = errorCodes.error_200.success;
			delete res_dt.responseParams.count;
			res_dt.responseParams.data = result[0].data;
			res_dt.responseParams.meta = result[1].meta;
			// console.log(result[0].data, ":::result[0].data");
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


//update new event
exports.update = function(callback, data, unique_id) {
	var checkit = new Checkit({
		unique_id : [
			{
				rule : 'required',
				message : 'Please provide the unique_id of event'
			},
			{
				rule : 'string',
				message : 'The unique_id of event must be a string'
			}
		],
		start_date : [
			{
				rule : 'datetime'
			}
		],
		end_date : [
			{
				rule : 'datetime'
			}
		]
	});

	var body = {'unique_id' : unique_id};

	var remove_keys = ['name', 'slug', 'unique_id', 'content_type'];

	checkit.run(body).then(function(validated) {
		var start_date_timestamp = moment(data['start_date'], 'YYYY-MM-DD HH:mm', true).valueOf();
		var end_date_timestamp = moment(data['end_date'], 'YYYY-MM-DD HH:mm', true).valueOf();
		if(start_date_timestamp > end_date_timestamp) {
			var error = errorCodes.error_400.custom_invalid_params;
			error.responseParams.message = 'The end date should not be before start date';
		  	callback(error);
		  	return false;
		}

		for(var z in remove_keys) {
			delete data[remove_keys[z]];
		}

		var update_data = {};
		update_data.update = {};
		update_data.condition = {'unique_id' : unique_id};
		data['updated_at'] = moment().format();
		data['updated_by'] = 'admin@gmail.com';

		if(data['start_date'] != undefined) {
			data['start_date'] = moment(data['start_date'], 'YYYY-MM-DD HH:mm', true).format();
		}
		if(data['end_date'] != undefined) {
			data['end_date'] = moment(data['end_date'], 'YYYY-MM-DD HH:mm', true).format();
		}
		if(data['is_active'] != undefined) {
			data['is_active'] = parseInt(data['is_active'], 10);
		}
		var gallery_list = [];
		if(data['remove_images'] && data['remove_images'].length != 0) {
			var remove_images = data['remove_images'];
			console.log(remove_images, ":::remove_images");
			var delete_data = {};
			delete_data.update = {};
			delete_data.condition = update_data.condition;

			delete_data.update = remove_images;
			deleteImages(function() {}, delete_data.update, delete_data.condition);
			delete data['remove_images'];
		}
		if(data['gallery'] != undefined && data['gallery'].length != 0) {
			gallery_list = data['gallery'];
		}
		
		delete data['gallery'];
		if(data['images'] && data['images'].length != 0) {
			update_data.update['$push'] = {'images' : { '$each' : data['images']}};
			delete data['images'];
			// save(update_data, gallery_list, 1, callback);
		}
		update_data.update['$set'] = data;
		save(update_data, gallery_list, 1, callback);

	});
};


function deleteImages (callback, images_data, images_condition) {
    events.update(images_condition, {'$pull' : {'images' : {'path' : {'$in' : images_data}}}}, function(err, res_dt) {

    	if(err) {
    		var error = errorCodes.error_403.server_error;
			callback(error);
    	} else {
			gallery.update(function() {}, {'$set' : {'is_active' : 0}}, {'path': {'$in' : images_data}});
			var utils_controller = require('../controllers/UtilController');
			var req = {};
			req['body'] = {'file_paths' : JSON.stringify(images_data)};
			utils_controller.deleteFiles(req);
			var result_response = errorCodes.error_200.success;
			callback(null, result_response);
		}
    });
};

exports.deleteImages = deleteImages;
