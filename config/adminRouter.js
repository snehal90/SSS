var routing = require('json-routing');
var apiVersion = require('api-version');

module.exports = function(express) {
	var api = express();
	var apiV1 = apiVersion.version(api, '/api/v1');

	var routeOptions = {
		routesPath      : "./routes/API/v1",
		controllerPath      : "./controllers",
		//policyPath      : "./policy"
	};

	

	routing(apiV1, routeOptions);
	return {'obj' : api};
};