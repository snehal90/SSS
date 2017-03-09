<div ng-controller="EventCtrl">
	<?php include('../../views/masters/partials/admin_heading.php');?>
	<!-- PAGE CONTENT WRAPPER -->
	<div class="page-content-wrap">

		<div class="row">
			<div class="panel panel-default">
                <div class="panel-heading">
            		<h3 class="panel-title">Events List</h3>
                	<div class="btn-group pull-right">
                        <button class="btn btn-primary">Add Event</button>
                	</div>
                </div>
                <div class="panel-body">
                    <table id="events_list" class="table">
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Is Active?</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
	</div>
</div>