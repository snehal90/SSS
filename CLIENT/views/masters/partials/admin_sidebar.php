<div class="page-sidebar page-sidebar-fixed scroll">
    <!-- START X-NAVIGATION -->
    <ul class="x-navigation">
        <li class="xn-logo">
            <a href="index.html">Admin</a>
            <a href="#" class="x-navigation-control"></a>
        </li>
        <li class="xn-profile">
            <a href="#" class="profile-mini">
                <img src="/assets/images/users/avatar.jpg" alt="John Doe"/>
            </a>
            <div class="profile">
                <div class="profile-image">
                    <img src="/assets/images/users/avatar.jpg" alt="John Doe"/>
                </div>
                <div class="profile-data">
                    <div class="profile-data-name">Admin</div>
                </div>
                <!-- <div class="profile-controls">
                    <a href="/pages-profile.html" class="profile-control-left"><span class="fa fa-info"></span></a>
                    <a href="/pages-messages.html" class="profile-control-right"><span class="fa fa-envelope"></span></a>
                </div> -->
            </div>                                                                        
        </li>
        <li class="xn-title">Navigation</li>
        <li ng-class="utilService.getClass('/admin/dashboard')">

            <a href="{{base_url}}admin/dashboard"><span class="fa fa-desktop"></span> <span class="xn-text">Dashboard</span></a>                        
        </li>                    
        <li ng-class="utilService.getClass('/admin/events')">
            <a href="{{base_url}}admin/events"><span class="fa fa-group"></span> <span class="xn-text">Events</span></a>
            <!-- <ul>
                <li><a href="pages-gallery.html"><span class="fa fa-image"></span> Gallery</a></li>
                <li><a href="pages-profile.html"><span class="fa fa-user"></span> Profile</a></li>
                <li><a href="pages-address-book.html"><span class="fa fa-users"></span> Address Book</a></li>
                <li class="xn-openable">
                    <a href="#"><span class="fa fa-clock-o"></span> Timeline</a>
                    <ul>
                        <li><a href="pages-timeline.html"><span class="fa fa-align-center"></span> Default</a></li>
                        <li><a href="pages-timeline-simple.html"><span class="fa fa-align-justify"></span> Full Width</a></li>
                    </ul>
                </li>
                <li class="xn-openable">
                    <a href="#"><span class="fa fa-envelope"></span> Mailbox</a>
                    <ul>
                        <li><a href="pages-mailbox-inbox.html"><span class="fa fa-inbox"></span> Inbox</a></li>
                        <li><a href="pages-mailbox-message.html"><span class="fa fa-file-text"></span> Message</a></li>
                        <li><a href="pages-mailbox-compose.html"><span class="fa fa-pencil"></span> Compose</a></li>
                    </ul>
                </li>
                <li><a href="pages-messages.html"><span class="fa fa-comments"></span> Messages</a></li>
                <li><a href="pages-calendar.html"><span class="fa fa-calendar"></span> Calendar</a></li>
                <li><a href="pages-tasks.html"><span class="fa fa-edit"></span> Tasks</a></li>
                <li><a href="pages-content-table.html"><span class="fa fa-columns"></span> Content Table</a></li>
                <li><a href="pages-faq.html"><span class="fa fa-question-circle"></span> FAQ</a></li>
                <li><a href="pages-search.html"><span class="fa fa-search"></span> Search</a></li>
                <li class="xn-openable">
                    <a href="#"><span class="fa fa-file"></span> Blog</a>
                    
                    <ul>                                    
                        <li><a href="pages-blog-list.html"><span class="fa fa-copy"></span> List of Posts</a></li>
                        <li><a href="pages-blog-post.html"><span class="fa fa-file-o"></span>Single Post</a></li>
                    </ul>
                </li>
                <li class="xn-openable">
                    <a href="#"><span class="fa fa-sign-in"></span> Login</a>
                    <ul>                                    
                        <li><a href="pages-login.html">App Login</a></li>
                        <li><a href="pages-login-website.html">Website Login</a></li>
                        <li><a href="pages-login-website-light.html"> Website Login Light</a></li>
                    </ul>
                </li>
                <li class="xn-openable">
                    <a href="#"><span class="fa fa-warning"></span> Error Pages</a>
                    <ul>                                    
                        <li><a href="pages-error-404.html">Error 404 Sample 1</a></li>
                        <li><a href="pages-error-404-2.html">Error 404 Sample 2</a></li>
                        <li><a href="pages-error-500.html"> Error 500</a></li>
                    </ul>
                </li>                            
            </ul> -->
        </li>
    </ul>
    <!-- END X-NAVIGATION -->
</div>