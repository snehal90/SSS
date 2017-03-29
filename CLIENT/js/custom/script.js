var remove_images_list = [];
var app = angular.module('sss_master', ['ui.router', 'angularCSS']);
// app.controller('MasterCtrl', function($scope, $location, $rootScope) {
app.service('utilService', function($location) {

	getClass = function (path) {
	  	return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}

	formatDate = function (actual_date) {
		var actual_date = new Date(actual_date);
		var date_val = actual_date.getDate();
		var month_val = actual_date.getMonth()+1;
		var year_val = actual_date.getFullYear();
		var hour_val = actual_date.getHours();
		var minute_val = actual_date.getMinutes();

		var datepicker_val = year_val + '-' + month_val + '-' + date_val;
		var timepicker_val = hour_val + ':' + minute_val;

		return {'datepicker_val' : datepicker_val, 'timepicker_val' : timepicker_val};
	};

	formatImagePath = function(image_path, type) {
		console.log('in func.....');
		var splitted_path = image_path.split('/');
		var file_name = splitted_path[splitted_path.length - 1];
		if($.inArray(type.toUpperCase(), ['THUMB', 'MID']) !== -1) {
			splitted_path[splitted_path.length - 1] = type.toUpperCase();
		}
		splitted_path[splitted_path.length] = file_name;
		var formatted_url = splitted_path.join('/');
		console.log(formatted_url, "::::formatted_url");
		return formatted_url;
	};

	return {
		getClass : getClass,
		formatDate : formatDate,
		formatImagePath : formatImagePath,
	};
// });
});

$(document).on('click', '.file_remove', function(ev) {
	ev.stopPropagation();
    ev.preventDefault();
    var image_path = $(this).attr('data-path');
	remove_images_list[remove_images_list.length] = image_path;
	$(this).parents(".gallery-item").fadeOut(400,function(){
        $(this).remove();
    });
    return false;
});