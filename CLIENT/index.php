<!DOCTYPE html>
<?php 
    if (strpos($_SERVER['REQUEST_URI'], 'admin') !== false || strpos($_SERVER['REQUEST_URI'], 'login') !== false) {
?>
<html ng-app="sss_admin" lang="en">
    <head>        
        <!-- META SECTION -->
        <title>Shree Swami Samarth</title>            
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <base href="/">
        
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <!-- END META SECTION -->

        <!-- START PLUGINS -->
        <script type="text/javascript" src="/js/plugins/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="/js/plugins/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/js/plugins/bootstrap/bootstrap.min.js"></script>        
        <!-- END PLUGINS -->

        <!-- START ANGULAR -->
        <script type="text/javascript" src="/js/angular.min.js"></script>
        <script type="text/javascript" src="/js/angular-ui-router.min.js"></script>
        <script type="text/javascript" src="/js/angular-css.min.js"></script>
        <script type="text/javascript" src="/js/angular-cookies.min.js"></script>
        <script type="text/javascript" src="/js/ng-file-upload-shim.min.js"></script>
        <script type="text/javascript" src="/js/ng-file-upload.min.js"></script>
        <script type="text/javascript" src="/js/custom/script.js"></script>
        <script type="text/javascript" src="/js/custom/config.js"></script>
        <script type="text/javascript" src="/js/custom/admin.js"></script>
        <!-- END ANGULAR -->
    </head>
    <body class="ui-view">
    </body>
</html>
<?php 
    } else {
?>
<!--[if lt IE 7]>      <html lang="en" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> 
<html ng-app="sss_frontend" lang="en" class="no-js"> <!--<![endif]-->
    <head>
        <!-- meta character set -->
        <meta charset="utf-8">
        <!-- Always force latest IE rendering engine or request Chrome Frame -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <base href="/">
        <title>Shree Swami Samarth</title>      
        <!-- Meta Description -->
        <meta name="description" content="Shree Swami Samarth">
        <meta name="keywords" content="shree, swami, samartha, devotional">
        
        <!-- Mobile Specific Meta -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <!-- CSS
        ================================================== -->
        
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
        
        <!-- Fontawesome Icon font -->
        <link rel="stylesheet" href="/css/frontend/font-awesome.min.css">
        <link rel="stylesheet" href="/css/frontend/jquery.fancybox.css">
        <link rel="stylesheet" href="/css/frontend/bootstrap.min.css">
        <link rel="stylesheet" href="/css/frontend/owl.carousel.css">
        <link rel="stylesheet" href="/css/frontend/slit-slider.css">
        <link rel="stylesheet" href="/css/frontend/animate.css">
        <link rel="stylesheet" href="/css/frontend/main.css">
        <link rel="stylesheet" href="/css/custom.css">

        <!-- Modernizer Script for old Browsers -->
        <!-- START PLUGINS -->
        <script type="text/javascript" src="/js/plugins/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="/js/plugins/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/js/plugins/bootstrap/bootstrap.min.js"></script>        
        <!-- END PLUGINS -->

        <!-- START ANGULAR -->
        <script type="text/javascript" src="/js/angular.min.js"></script>
        <script type="text/javascript" src="/js/angular-ui-router.min.js"></script>
        <script type="text/javascript" src="/js/angular-css.min.js"></script>
        <script type="text/javascript" src="/js/ng-file-upload-shim.min.js"></script>
        <script type="text/javascript" src="/js/ng-file-upload.min.js"></script>
        <script type="text/javascript" src="/js/custom/script.js"></script>
        <script type="text/javascript" src="/js/custom/config.js"></script>
        <script type="text/javascript" src="/js/custom/frontend.js"></script>
        <script type="text/javascript" src="/js/frontend/modernizr-2.6.2.min.js"></script>
        <script type="text/javascript" src="/js/frontend/jquery.singlePageNav.min.js"></script>
        <script type="text/javascript" src="/js/frontend/jquery.fancybox.pack.js"></script>
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
        <script type="text/javascript" src="/js/frontend/owl.carousel.min.js"></script>
        <script type="text/javascript" src="/js/frontend/jquery.easing.min.js"></script>
        <script type="text/javascript" src="/js/frontend/jquery.slitslider.js"></script>
        <script type="text/javascript" src="/js/frontend/jquery.ba-cond.min.js"></script>
        <script type="text/javascript" src="/js/frontend/wow.min.js"></script>
        <!-- END ANGULAR -->

    </head>
    
    <body id="body">
        <!-- preloader -->
        <div id="preloader">
            <div class="loder-box">
                <div class="battery"></div>
            </div>
        </div>
        <!-- end preloader -->

        <!--
        Fixed Navigation
        ==================================== -->
        <?php include('views/masters/partials/frontend_top_header.php') ?>
        <!--
        End Fixed Navigation
        ==================================== -->
        
        <main class="site-content" role="main" ui-view="" >
            
        </main>
        
        
        <!-- Essential jQuery Plugins
        ================================================== -->
        <!-- Main jQuery -->
        <?php //include('views/masters/partials/frontend_footer.php') ?>
    </body>
</html>
<?php
    }
?>





