var gallery = db.collection('gallery');
var async = require('async');
var errorCodes = require('../config/error');

exports.save = function(data, callback) {
	var bulk = gallery.initializeOrderedBulkOp();
	async.eachSeries(data, function(dt, cb) {
		bulk.insert(dt);
		cb();
	}, function(err) {
		if(err) {
			var error = errorCodes.error_403.server_error;
			callback(error);
		} else {
			bulk.execute(function (err, res) {
			  	if(err) {
					var error = errorCodes.error_403.server_error;
					callback(error);
				} else {
					var result_response = errorCodes.error_200.success;
					callback(null, result_response);
				}
			});
		}
	});

}

exports.update = function(callback, images_data, images_condition) {
	gallery.update(images_condition, images_data, function(err, res_dt) {
    	if(err) {
    		var error = errorCodes.error_403.server_error;
			callback(error);
    	} else {
			var result_response = errorCodes.error_200.success;
			callback(null, result_response);
		}
    });
};