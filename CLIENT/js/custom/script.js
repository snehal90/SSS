var app = angular.module('sss_master', ['ui.router', 'sss_frontend', 'sss_admin', 'angularCSS']);
app.controller('MasterCtrl', function($scope, $location) {
	$scope.getClass = function (path) {
	  	return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}
});