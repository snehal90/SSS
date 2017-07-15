<div>
	<?php include('../../views/masters/partials/admin_heading.php');?>
	<!-- PAGE CONTENT WRAPPER -->
	<div class="page-content-wrap">

		<div class="row">
			<div class="panel panel-default">
                <div class="panel-heading">
            		<h3 class="panel-title">Edit Event</h3>
                	<!-- <div class="btn-group pull-right">
                        <button class="btn btn-primary">Add Event</button>
                	</div> -->
                </div>
                <?php include('./partials/event_form.php'); ?>
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
                <p>Event updated successfully</p>
            </div>
            <div class="mb-footer">
                <button class="btn btn-default btn-lg pull-right mb-control-close">Close</button>
            </div>
        </div>
    </div>
</div>
<!-- end success -->
<script type="text/javascript">
var scope = angular.element('#content').scope();
$(document).ready(function() {
    $('#content').summernote(
        {
            height: 150,
            codemirror: {
                mode: 'text/html',
                htmlMode: true,
                lineNumbers: true,
                theme: 'default'
            }
        });
    // $('#content').code(content);
    $("#start_time,#end_time").timepicker({minuteStep: 1,showMeridian: false, defaultTime: ''});
});
</script>