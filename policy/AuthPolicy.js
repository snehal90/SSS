var errorCodes = require('../config/error');

exports.checkSecretKey = function(req, res, next) {
	if(!req.headers.secret_key) {
		var error_val = errorCodes.error_401.invalid_secret_key;
		error_val.responseParams.message = 'secret_key is required';
		res.status(error_val.responseHeaders.status).send(error_val.responseParams);
	} else if(req.headers.secret_key !== SECRET_KEY) {
		var invalid_error_val = errorCodes.error_401.invalid_secret_key;
		invalid_error_val.responseParams.message = 'Invalid secret_key';
		res.status(invalid_error_val.responseHeaders.status).send(invalid_error_val.responseParams);
	} else {
		return next();
	}
}