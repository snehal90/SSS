<?php include('../../../views/masters/partials/admin_header.php');?>
<!-- START PAGE CONTAINER -->
<div class="page-container page-navigation-top-fixed">
    
    <!-- START PAGE SIDEBAR -->
    <?php include('../../../views/masters/partials/admin_sidebar.php');?>
    <!-- END PAGE SIDEBAR -->
    
    <!-- PAGE CONTENT -->
    <div class="page-content">
        
        <!-- START X-NAVIGATION VERTICAL -->
        <?php include('../../../views/masters/partials/admin_top_header.php');?>
        <!-- END X-NAVIGATION VERTICAL -->                     

        <!-- START BREADCRUMB -->
        <?php include('../../../views/masters/partials/admin_breadcrumb.php');?>
        <!-- END BREADCRUMB -->                       
        <div ui-view="" >
        </div>                               
    </div>            
    <!-- END PAGE CONTENT -->
</div>
<!-- END PAGE CONTAINER -->

    
<?php include('../../../views/masters/partials/admin_footer.php');?>