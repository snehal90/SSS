<div>
	<?php include('../../views/masters/partials/admin_heading.php');?>
	<!-- PAGE CONTENT WRAPPER -->
	<div class="page-content-wrap">

		<div class="row">
			<div class="panel panel-default">
                <div class="panel-heading">
            		<h3 class="panel-title">Events List</h3>
                	<div class="btn-group pull-right">
                        <a class="btn btn-primary" href="{{base_url}}admin/events/create">Add Event</a>
                	</div>
                </div>
                <div class="panel-body">
                    <div class="form-group">
                        <label class="col-md-2 control-label">Select Date Range:</label>
                        <div class="col-md-3">
                            <div class="input-group">
                                <input type="text" id="start_date" class="form-control events_filter" data-date-format="yyyy-mm-dd" data-date-viewmode="years" placeholder='Select Start Date' ng-model="start_date" ng-change="filter_clicked('start_date', $event, 'change', start_date)">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group">
                                <input type="text" id="end_date" class="form-control events_filter" data-date-format="yyyy-mm-dd" data-date-viewmode="years" placeholder='Select End Date' ng-model="end_date" ng-change="filter_clicked('end_date', $event, 'change', end_date)">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                            </div>
                        </div>
                    </div>
                    <table id="events_list" class="display table table-bordered">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Is Active?</th>
                                <th>Type</th>
                                <th>Update Status</th>
                            </tr>
                            <tr>
                                <td><input type="text" data-column="0" class="events_filter form-control" rel="unique_id" style="width:90%" ng-model="unique_id" ng-click="$event.stopPropagation()" ng-keyup="filter_clicked('unique_id', $event, 'keyup', unique_id)" /></td>
                                <td><input type="text" data-column="1" class="events_filter form-control" rel="name" style="width:90%" ng-model="name" ng-click="$event.stopPropagation()" ng-keyup="filter_clicked('name', $event, 'keyup', name)" /></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="form-group">
                                        <select data-column="4" class="form-control events_filter" rel="is_active" ng-model="is_active" ng-change="filter_clicked('is_active', $event, 'change', is_active)" >
                                            <option value="">-- Select --</option>
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <select data-column="5" class="form-control events_filter" rel="type" ng-model="type" ng-change="filter_clicked('type', $event, 'change', type)" >
                                            <option value="">-- Select --</option>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="past">Past</option>
                                        </select>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
	</div>
</div>
<!-- success -->
<div class="message-box message-box-success animated fadeIn" id="message-box-success">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title"><span class="fa fa-check"></span> Success</div>
            <div class="mb-content">
                <p>Event's status updated successfully</p>
            </div>
            <div class="mb-footer">
                <button class="btn btn-default btn-lg pull-right mb-control-close">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- end success -->