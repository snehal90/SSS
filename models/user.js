var users = db.collection('users');

var Checkit = require('checkit');
var md5 = require('md5');
var errorCodes = require('../config/error');
var jwt = require('jsonwebtoken');
var moment = require('moment');

exports.getUser = function(callback, request_dt) {
	var checkit = new Checkit({
		email : [
			{
				rule : 'required',
			},
			{
				rule : 'email',
				message : 'Invalid Email'
			}
		],
		password : [
			{
				rule : 'required',
			}
		]
	});

	var body = request_dt;

	checkit.run(body).then(function(validated) {
		var qry_pwd = md5(PWD_SALT + request_dt.password);
		var email = request_dt.email;
		var qry = {'email' : email, 'password' : qry_pwd};

		users.find(qry).toArray(function(err, users_dt) {
			if(err) {
				var error = errorCodes.error_403.server_error;
				callback(error);
			} else {
				var result_response = errorCodes.error_200.success;
				result_response.responseParams.user = {};
				if(users_dt.length > 0) {
					var payload = {
						'user_id' : users_dt[0]._id,
						'email' : users_dt[0].email
					}


					var token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn : "30 days"});

					var qry_update = {'$set' : {'access_token' : token, 'expiry' : moment().add(1, 'months').format()}};
					users.update(qry, qry_update, function(err, dt) {
					});
					result_response.responseHeaders.access_token = token;
					delete users_dt[0].password;
					delete users_dt[0].access_token;
					result_response.responseParams.user = users_dt[0];
					console.log(result_response, ":::::result_response");
				}
				callback(null, result_response);
			}
		});
	}).catch(Checkit.Error, function(err) {
		var error = errorCodes.error_400.custom_invalid_params;
		error.responseParams.message = err.toJSON();
	  	callback(error);
	});
};