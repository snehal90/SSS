var app = angular.module('sss_admin', ['ui.router', 'angularCSS', 'config']);
app.config(['$stateProvider', '$urlRouterProvider', '$cssProvider', function($stateProvider, $urlRouterProvider, $cssProvider) {
	angular.extend($cssProvider.defaults, {
	    persist: true,
	    preload: true,
	});

    // $urlRouterProvider.otherwise('/admin/dashboard');
	$stateProvider.state('admin', {
		url: '/admin',
		abstract: true,
		templateUrl : '/views/masters/partials/admin_body.php',
		css: {
	        href: '/css/theme-default.css',
	        preload: true,
	        persist: true
	      }
		// css: ''
		// controller : 'HomeCtrl'
	}).state('admin.dashboard', {
		url: '/dashboard',
		templateUrl : '/views/dashboard/home.php',
		css: ['/css/theme-default.css'],
		controller: 'HomeCtrl'
		// css: {
	 //        href: '/css/theme-default.css',
	 //        preload: true,
	 //        persist: true
	 //      }
		// controller : 'HomeCtrl'
	}).state('admin.events', {
		url: '/events',
		templateUrl : '/views/events/list.php',
		css: ['css/theme-default.css'],
		controller : 'EventCtrl'
	}).state('admin.events.add', {
		url: '/add',
		templateUrl : '/views/events/list.php',
		css: ['css/theme-default.css'],
		controller : 'EventCtrl'
	});
	// $locationProvider.html5Mode(true);
}]);

app.run(function($rootScope) {
	$rootScope.base_url = location.origin + '/#/'
});

app.controller('HomeCtrl', function($scope) {
	$scope.page_heading = "Dashboard";
});

app.controller('EventCtrl', function($scope, $http, CONFIGS) {
	$scope.page_heading = "Events";
	var link = $scope.base_url + 'event/{id}';

	$("#events_list").dataTable({
		"bDestroy": true,
		"bProcessing": true,
        "bServerSide": true,
        "bSortClasses": false,
        "bAutoWidth": false,
        "bLengthChange": false,
        "iDisplayLength": 20,
        "sAjaxSource": '../../ajaxDatatableLoad.php?url=' + CONFIGS.api_url+'events&req_list=' + JSON.stringify(['unique_id', 'name', 'start_date', 'end_date', 'is_active', 'type']) + '&id_link=' + encodeURIComponent(link),
        "aoColumns": [
        	{"bSortable": true, "bSearchable": false}, //uniqueId
        	{"bSortable": true, "bSearchable": false}, //name
        	{"bSortable": true, "bSearchable": false}, //start_date
        	{"bSortable": true, "bSearchable": false}, //end_date
        	{"bSortable": false, "bSearchable": false}, //is_active
        	{"bSortable": false, "bSearchable": false} //type
        ]
	});
});