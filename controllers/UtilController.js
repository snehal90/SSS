var file_helper_obj = require('../helpers/file_helper');
var errorCodes = require('../config/error');
var fs = require('fs');
var async = require('async');

exports.fileUpload = function(req, res, callback) {
	var images = req.files;
	var type = req.body.type;
	file_helper_obj.uploadImages(function(err, res_dt) {
		if(err) {
			var error = errorCodes.error_403.server_error;
			return res.status(error.responseHeaders.status).send(error.responseParams);
		}
		var result_response = errorCodes.error_200.success;

		result_response.responseParams.data = res_dt;
		res.status(result_response.responseHeaders.status).send(result_response.responseParams);
	}, images, type.toUpperCase());
}

exports.deleteFiles = function(req, res, callback) {
	var file_paths = JSON.parse(req.body.file_paths);
	async.eachSeries(file_paths, function(file_path) {
		var original_path = file_path;
		var exploded_path = file_path.split('/');
		var file_name = exploded_path[exploded_path.length -1];

		//THUMB folder path
		var THUMB_path_chunks = file_path.split('/');
		THUMB_path_chunks[exploded_path.length -1] = 'THUMB';
		THUMB_path_chunks[THUMB_path_chunks.length] = file_name;
		var THUMB_path = THUMB_path_chunks.join('/');

		//MID folder path
		var MID_path_chunks = file_path.split('/');
		MID_path_chunks[exploded_path.length -1] = 'MID';
		MID_path_chunks[MID_path_chunks.length] = file_name;
		var MID_path = MID_path_chunks.join('/');

		fs.unlink(ROOT_DIR + 'public' + original_path, function(err) {
			if(err) {
				console.log(err, "::::err");
			} else {
				console.log('success');
			}
		});
		fs.unlink(ROOT_DIR + 'public' + MID_path, function(err) {
			if(err) {
				console.log(err, "::::err MID_path");
			} else {
				console.log('success MID_path');
			}
		});
		fs.unlink(ROOT_DIR + 'public' + THUMB_path, function(err) {
			if(err) {
				console.log(err, "::::err THUMB_path");
			} else {
				console.log('success THUMB_path');
			}
		});
	});

	var delete_files_res = errorCodes.error_200.success;
	if(res == undefined) {
		return delete_files_res.responseParams;
	} else {
		res.status(delete_files_res.responseHeaders.status).send(delete_files_res.responseParams);
	}
}