var app1 = angular.module('sss_frontend', ['ui.router', 'angularCSS']);
app1.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
	$stateProvider.state('frontend', {
		// url: '/',
		abstract: true,
		templateUrl : '/views/masters/partials/frontend_body.php',
		// controller : 'HomeCtrl'
	}).state('frontend.dashboard', {
		url: '/',
		templateUrl : '/views/dashboard/home.php',
		controller : 'HomeCtrl'
	});
	// $locationProvider.html5Mode(true);
}]);

app1.controller('HomeCtrl', function($scope) {
	$scope.title_text = "tttttttt";
});