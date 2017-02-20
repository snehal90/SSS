var routing = require('json-routing');

module.exports = function(express) {
	var api = express();

	var routeOptions = {
		routesPath      : "./routes/CLIENT",
		controllerPath      : "./controllers",
		//policyPath      : "./policy"
	};

	

	routing(api, routeOptions);
	return {'obj' : api};
};