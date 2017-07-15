<div class="page-container page-navigation-top-fixed row">
    <div class="login-container">
    
        <div class="login-box animated fadeInDown">
            <div class="login-logo"></div>
            <div class="login-body">
                <div class="login-title"><strong>Welcome</strong>, Please login</div>
                <div class="alert main_error_wrapper" role="alert" style="display:none;">
                    <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                    <span id="error_container"></span>
                </div>
                <form class="form-horizontal" method="post">
                <div class="form-group">
                    <div class="col-md-12">
                        <input type="text" class="form-control" ng-model="email" id="email" placeholder="Email Id"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12">
                        <input type="password" class="form-control" ng-model="password" id="password" placeholder="Password"/>
                    </div>
                </div>
                <div class="form-group">
                    <!-- <div class="col-md-6">
                        <a href="#" class="btn btn-link btn-block">Forgot your password?</a>
                    </div> -->
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-info btn-block" ng-click="login()">Log In</button>
                    </div>
                </div>
                </form>
            </div>
           <!--  <div class="login-footer">
                <div class="pull-left">
                    &copy; 2014 AppName
                </div>
                <div class="pull-right">
                    <a href="#">About</a> |
                    <a href="#">Privacy</a> |
                    <a href="#">Contact Us</a>
                </div>
            </div> -->
        </div>
        
    </div>
</div>