var app = angular.module('sss_admin', ['ui.router', 'sss_master', 'angularCSS', 'config', 'ngFileUpload']);
var images_list = [];
var gallery_list = [];

app.config(['$stateProvider', '$urlRouterProvider', '$cssProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $cssProvider, $locationProvider) {
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
	}).state('admin.dashboard', {
		url: '/dashboard',
		templateUrl : '/views/dashboard/home.php',
		css: ['/css/theme-default.css'],
		controller: 'HomeCtrl'
	}).state('admin.events', {
		url: '/events',
		templateUrl : '/views/events/list.php',
		css: ['css/theme-default.css'],
		controller : 'EventCtrl'
	}).state('admin.events_create', {
		url: '/events/create',
		templateUrl : '/views/events/create_view.php',
		css: ['css/theme-default.css'],
		controller : 'EventCtrl'
	}).state('admin.events_edit', {
		url: '/events/:unique_id',
		templateUrl : '/views/events/edit_view.php',
		css: ['css/theme-default.css'],

		onEnter: function($rootScope, $timeout, $stateParams) { 
			$timeout(function() {
	            $rootScope.$broadcast('editView', $stateParams.unique_id);
	        })
		},
		controller : 'EventCtrl'
	});
	$locationProvider.html5Mode(true);
}]);

app.run(function($rootScope, $window, $http, CONFIGS, utilService) {
	$rootScope.utilService = utilService;
	$rootScope.base_url = location.origin + '/';
	$window.addEventListener('beforeunload', function() {
    	var file_paths = [];
		for(var x in images_list) {
			file_paths[file_paths.length] = images_list[x].path;
		}
		remove_images_list = [];
		$.ajax({
			url : CONFIGS.api_url + 'deleteFiles',
			method : 'post',
			async: false,
			data : {
				'file_paths' : JSON.stringify(file_paths)
			}
		}).success(function(ret_dt) {

			if(ret_dt.status == 'success') {
				images_list = [];
				gallery_list = [];
			}
			return null;
		});
    });
});

app.controller('HomeCtrl', function($scope) {
	$scope.page_heading = "Dashboard";
});

app.controller('EventCtrl', function($scope, $http, CONFIGS, $timeout, Upload, $compile, $rootScope) {
	$scope.page_heading = "Events";
	$scope.save_btn_action = 'addEvent';
	$scope.save_btn_text = "Save";
	var link = $scope.base_url + 'admin/events/{unique_id}';
	var filter_list = {};

	$timeout(function() {
		event_list_table({});
	}, 500);

	$scope.filter_clicked = function(key, $event, event_type, value) {
		if(event_type == 'keyup') {
			$event.stopPropagation();
			$event.preventDefault();
			if($event.keyCode == 13 || $.trim(value) == '') {
				filter_list[key] = $.trim(value);
				if($.trim(value) == '') {
					delete filter_list[key];
				}
				event_list_table(filter_list);
			}
		} else if(event_type == 'change') {
			filter_list[key] = $.trim(value);
			if($.trim(value) == '') {
				delete filter_list[key];
			}
			event_list_table(filter_list);
		}
	};

	function event_list_table(filter_list) {
		$("#start_date,#end_date").datepicker({
	        dateFormat: 'yyyy-mm-dd',
	        // endDate: new Date(),
	    }).on('changeDate', function (ev) {
	        // checkout.hide();
	    }).data('datepicker');
		var url = CONFIGS.api_url + 'events';

		$("#events_list").dataTable({
			"bDestroy": true,
			"bProcessing": true,
		    "bServerSide": true,
		    "bSortClasses": false,
		    "bAutoWidth": false,
		    "bLengthChange": false,
		    "iDisplayLength": 20,
		    "sAjaxSource": '../../ajaxDatatableLoad.php?url=' + url +'&req_list=' + JSON.stringify(['unique_id', 'name', 'start_date', 'end_date', 'is_active', 'type']) + '&id_link=' + encodeURIComponent(link) + '&filter_list=' + JSON.stringify(filter_list) + 'req_type=EVENT',
		    "aoColumns": [
		    	{"bSortable": false, "bSearchable": false}, //uniqueId
		    	{"bSortable": false, "bSearchable": false}, //name
		    	{"bSortable": false, "bSearchable": false}, //start_date
		    	{"bSortable": false, "bSearchable": false}, //end_date
		    	{"bSortable": false, "bSearchable": false}, //is_active
		    	{"bSortable": false, "bSearchable": false}, //type
		    	{"bSortable": false, "bSearchable": false} //active/inactive update
		    ],
		    "fnInitComplete": function(settings, json) {
				var updateStatus = angular.element($('.update_status'));
				updateStatus.bind('click', $scope.statusUpdate);
			}
		});
		$("#events_list_filter").hide();
	}

	$scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
            Upload.upload({
                url: CONFIGS.api_url + 'fileUpload',
                data: {
                    files: files,
                    type: 'EVENT'
                }
            }).then(function (response) {
                if(response.data.status == 'success') {
                	images_list.push.apply(images_list, response.data.data.images_list);
                	gallery_list.push.apply(gallery_list, response.data.data.gallery_list);
                }
            });
        }
    };

	$scope.addEvent = function() {
		var name = $.trim($scope.name);
		var short_description = $.trim($scope.short_description);
		var content = $.trim($('#content').code());
		var start_date = $.trim($scope.start_date);
		var start_time = $.trim($scope.start_time);
		var end_date = $.trim($scope.end_date);
		var end_time = $.trim($scope.end_time);
		var is_active = $.trim($scope.is_active);
		// var images = files_dt.length != 0 ? files_dt : {};
		var error_msg = {};
		if(name == '') {
			error_msg['#name'] = 'Please enter name';
		}

		if($.trim(String(content).replace(/<[^>]+>/gm, '')) == '') {
			error_msg['#content'] = 'Please enter content';
		}

		if(start_date == '' || start_time == '') {
			error_msg['#start_datetime_container'] = 'Please enter start datetime of event';
		}

		if(end_date == '' || end_time == '') {
			error_msg['#end_datetime_container'] = 'Please enter end datetime of event';
		}

		if(is_active == '' || is_active == undefined) {
			error_msg['#is_active_container'] = 'Please select whether event is active or inactive';
		}

		console.log(error_msg, "::::error_msg");
		if(Object.keys(error_msg).length != 0) {
			showError(error_msg);
		} else {

			var post_data = {};
			var start_time_splitted = start_time.split(':');
			start_time_splitted[0] = start_time_splitted[0] <= 9 ? '0' + start_time_splitted[0] : start_time_splitted[0];
			start_time = start_time_splitted.join(':');
			var end_time_splitted = end_time.split(':');
			end_time_splitted[0] = end_time_splitted[0] <= 9 ? '0' + end_time_splitted[0] : end_time_splitted[0];
			end_time = end_time_splitted.join(':');

			var start_datetime = start_date + ' ' + start_time;
			var end_datetime = end_date + ' ' + end_time;

			post_data = {
				name : name,
				content : content,
				short_description : short_description,
				start_date : start_datetime,
				end_date : end_datetime,
				is_active : is_active,
			};

			if(images_list.length != 0) {
				post_data['images'] = images_list;
			}

			if(gallery_list.length != 0) {
				post_data['gallery'] = gallery_list;
			}

			console.log(post_data, "::::post_data");
			// return false;

			$('label.error').remove();
			$http({
				url : CONFIGS.api_url + 'event/add',
				method : 'post',
				data : post_data
			}).success(function(ret_dt) {
				if(ret_dt.status == 'success') {
					$('.main_error_wrapper').hide();
					$('#message-box-success').show();
					images_list = [];
					gallery_list = [];
					setTimeout(function() {
						location.href = $scope.base_url + 'admin/events';
					}, 1000);

				} else {
					if(typeof ret_dt.message == 'string') {
						$('.main_error_wrapper').find('#error_container').text(ret_dt.message);
						$('.main_error_wrapper').addClass('alert-danger').show();
					} else {

					}
					$('html, body').animate({
						scrollTop : $('.page-content-wrap').offset().top
					}, 'slow');
				}
				console.log(ret_dt, "::::ret_dt");
			});
		}
	};

	$scope.$on('editView', function(event, unique_id) {

	    $http({
			url : CONFIGS.api_url + 'events/?unique_id=' + unique_id,
			method : 'get',
		}).success(function(ret_dt) {
			if(ret_dt.status == 'success') {
				var event_list = ret_dt.data[0];
				$scope.name = event_list.name;
				$scope.unique_id = unique_id;
				$scope.short_description = event_list.short_description;
				$scope.content = event_list.content;

				var start_datetime = event_list.start_date;
				var formatted_start_date = $rootScope.utilService.formatDate(start_datetime);
				// $scope.start_date = formatted_start_date.datepicker_val;
				var start_date = formatted_start_date.datepicker_val;
				var start_time = formatted_start_date.timepicker_val;
				$("#start_time").timepicker('setTime', start_time);
				$("#start_date").datepicker('setDates', start_date)

				var end_datetime = event_list.end_date;
				var formatted_end_date = $rootScope.utilService.formatDate(end_datetime);
				// $scope.end_date = formatted_end_date.datepicker_val;
				var end_date = formatted_end_date.datepicker_val;
				var end_time = formatted_end_date.timepicker_val;
				$("#end_time").timepicker('setTime', end_time);
				$("#end_date").datepicker('setDates', end_date)
				
				$scope.is_active = event_list.is_active;
				$scope.existing_images = event_list.images;
				$('#content').code($scope.content);
				$scope.save_btn_action = 'update';
				$scope.save_btn_text = "Update";
			}
		});
	});

	$scope.removeImage = function($event) {
		var image_path = $($event.target).attr('data_path');
		remove_images_list[remove_images_list.length] = remove_images_list;
	};

	$scope.statusUpdate = function($event) {
		var id = $($event.target).closest('.update_status').attr('data_unique_id');
		var attr_rel = $($event.target).closest('.update_status').attr('rel');
		var is_active = attr_rel == 1 ? 0 : 1;

		$scope.update(id, {'is_active' : is_active});
	};


	$scope.update = function(id, post_data) {
		if(post_data == undefined) {
			var name = $.trim($scope.name);
			var short_description = $.trim($scope.short_description);
			var content = $.trim($('#content').code());
			var start_date = $.trim($scope.start_date);
			var start_time = $.trim($scope.start_time);
			var end_date = $.trim($scope.end_date);
			var end_time = $.trim($scope.end_time);
			var is_active = $.trim($scope.is_active);
			// var images = files_dt.length != 0 ? files_dt : {};
			var error_msg = {};
			if(name == '') {
				error_msg['#name'] = 'Please enter name';
			}

			if($.trim(String(content).replace(/<[^>]+>/gm, '')) == '') {
				error_msg['#content'] = 'Please enter content';
			}

			if(start_date == '' || start_time == '') {
				error_msg['#start_datetime_container'] = 'Please enter start datetime of event';
			}

			if(end_date == '' || end_time == '') {
				error_msg['#end_datetime_container'] = 'Please enter end datetime of event';
			}

			if(is_active == '' || is_active == undefined) {
				error_msg['#is_active_container'] = 'Please select whether event is active or inactive';
			}

			console.log(error_msg, "::::error_msg");
			if(Object.keys(error_msg).length != 0) {
				showError(error_msg);
			} else {

				var post_data = {};
				var start_time_splitted = start_time.split(':');
				start_time_splitted[0] = start_time_splitted[0] <= 9 ? '0' + start_time_splitted[0] : start_time_splitted[0];
				start_time = start_time_splitted.join(':');
				var end_time_splitted = end_time.split(':');
				end_time_splitted[0] = end_time_splitted[0] <= 9 ? '0' + end_time_splitted[0] : end_time_splitted[0];
				end_time = end_time_splitted.join(':');

				var start_datetime = start_date + ' ' + start_time;
				var end_datetime = end_date + ' ' + end_time;

				post_data = {
					name : name,
					content : content,
					short_description : short_description,
					start_date : start_datetime,
					end_date : end_datetime,
					is_active : is_active,
				};

				if(images_list.length != 0) {
					post_data['images'] = images_list;
				}

				if(gallery_list.length != 0) {
					post_data['gallery'] = gallery_list;
				}

				console.log(post_data, "::::post_data");
				// return false;

				$('label.error').remove();
			}
		}

		if(remove_images_list.length != 0) {
			post_data['remove_images'] = remove_images_list;
		}

		// return false;
		$http({
			url : CONFIGS.api_url + 'event/update/' + id,
			method : 'post',
			data : post_data
		}).success(function(ret_dt) {
			console.log(ret_dt, ":::::ret_dt");
			if(ret_dt.status == 'success') {
				$('.main_error_wrapper').hide();
				$('#message-box-success').show();
				images_list = [];
				gallery_list = [];
				setTimeout(function() {
					location.href = $scope.base_url + 'admin/events';
				}, 1000);

			} else {
				if(typeof ret_dt.message == 'string') {
					$('.main_error_wrapper').find('#error_container').text(ret_dt.message);
					$('.main_error_wrapper').addClass('alert-danger').show();
				} else {

				}
				$('html, body').animate({
					scrollTop : $('.page-content-wrap').offset().top
				}, 'slow');
			}
		});
	}

	function showError(error_list) {
		for(var j in error_list) {
			if($(j).parent('div').find('.error').length != 0) {
				$(j).parent('div').find('.error').remove();
			}
			$('<label class="error">' + error_list[j] + '</label>').insertAfter($(j)).show();
		}

		$('html, body').animate({
			scrollTop : $('.page-content-wrap').offset().top
		}, 'slow');
	}
});
