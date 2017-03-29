<script type="text/javascript" src="/js/frontend/main.js"></script>
<script type="text/javascript" src="/js/frontend/home.js"></script>
<!--
Home Slider
==================================== -->
<div ng-controller="HomeFrontendCtrl">
    <section id="home-slider">
        <div id="slider" class="sl-slider-wrapper">

            <div class="sl-slider">
            
                <div class="sl-slide" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2">

                    <div class="bg-img bg-img-1"></div>

                    <div class="slide-caption">
                        <div class="caption-content">
                            <h2 class="animated fadeInDown">Shree Swami Samarth</h2>
                            <!-- <span class="animated fadeInDown">Clean and Professional one page Template</span> -->
                            <!-- <a href="#" class="btn btn-blue btn-effect">Join US</a> -->
                        </div>
                    </div>
                    
                </div>

            </div><!-- /sl-slider -->

            <!-- 
            <nav id="nav-arrows" class="nav-arrows">
                <span class="nav-arrow-prev">Previous</span>
                <span class="nav-arrow-next">Next</span>
            </nav>
            -->
            
            <!-- <nav id="nav-arrows" class="nav-arrows hidden-xs hidden-sm visible-md visible-lg">
                <a href="javascript:;" class="sl-prev">
                    <i class="fa fa-angle-left fa-3x"></i>
                </a>
                <a href="javascript:;" class="sl-next">
                    <i class="fa fa-angle-right fa-3x"></i>
                </a>
            </nav> -->
            

            <nav id="nav-dots" class="nav-dots visible-xs visible-sm hidden-md hidden-lg">
                <span class="nav-dot-current"></span>
                <span></span>
                <span></span>
            </nav>

        </div><!-- /slider-wrapper -->
    </section>

    <!--
    End Home SliderEnd
    ==================================== -->
        
    <!-- Service section -->
    <section id="features">
        <div class="container">
            <div class="row">
            
                <div class="sec-title text-center">
                    <h2 class="wow animated bounceInLeft">Features</h2>
                    <p class="wow animated bounceInRight">Our key features</p>
                </div>
                
                <div class="col-md-3 col-sm-6 col-xs-12 text-center wow animated zoomIn">
                    <div class="service-item">
                        <div class="service-icon">
                            <i class="fa fa-home fa-3x"></i>
                        </div>
                        <h3>Swami Sadhana</h3>
                        <p>Peaceful, stress releasing, relaxing</p>
                    </div>
                </div>
            
                <div class="col-md-3 col-sm-6 col-xs-12 text-center wow animated zoomIn" data-wow-delay="0.3s">
                    <a class="link_slide" href='#upcoming_events'>
                        <div class="service-item">
                            <div class="service-icon">
                                <i class="fa fa-tasks fa-3x"></i>
                            </div>
                            <h3>Upcoming Events</h3>
                            <p>The list of upcoming events</p>
                        </div>
                    </a>
                </div>
            
                <div class="col-md-3 col-sm-6 col-xs-12 text-center wow animated zoomIn" data-wow-delay="0.6s">
                    <div class="service-item">
                        <div class="service-icon">
                            <i class="fa fa-clock-o fa-3x"></i>
                        </div>
                        <h3>Blogs</h3>
                        <p>User experience that can change your process of thinking aboout The God</p>
                    </div>
                </div>
            
                <div class="col-md-3 col-sm-6 col-xs-12 text-center wow animated zoomIn" data-wow-delay="0.9s">
                    <div class="service-item">
                        <div class="service-icon">
                            <i class="fa fa-heart fa-3x"></i>
                        </div>
                        
                        <h3>Swami Leela</h3>
                        <p>The list of Swami leelas</p>                          
                    </div>
                </div>
                
            </div>
        </div>
    </section>
    <!-- end Service section -->
    
    <!-- portfolio section -->
    <section id="upcoming_events">
        <div class="container">
            <div class="row">
            
                <div class="sec-title text-center wow animated fadeInDown">
                    <h2>Upcoing Events</h2>
                    <p>The list of upcoming events</p>
                </div>
                

                <ul class="project-wrapper wow animated fadeInUp">
                    <li class="portfolio-item" ng-repeat="event_dt in upcoming_events_list">
                        <a href="#" >
                            <img ng-src="{{utilService.formatImagePath(event_dt.images[0].image_path, 'MID')}}" class="img-responsive" alt="{{event_dt.name}}" onerror="this.src='/assets/images/no_image_default.png'" />
                        </a>
                        <figcaption class="mask">
                            <h3>{{event_dt.name}}</h3>
                            <p>{{event_dt.short_description}}</p>
                        </figcaption>
                        <ul class="external">
                            <li><a class="fancybox" title="{{event_dt.name}}" data-fancybox-group="works" href="{{event_dt.images[0].image_path}}" onerror="this.href='/assets/images/no_image_default.png'" ><i class="fa fa-search"></i></a></li>
                        </ul>
                    </li>
                </ul>

                <div class="text-center">
                    <a href="#" class="btn btn-blue btn-effect">View All Upcoming Events</a>
                </div>
                
            </div>
        </div>
    </section>
    <!-- end portfolio section -->
     
    <!-- Social section -->
    <section id="social" class="parallax">
        <div class="overlay">
            <div class="container">
                <div class="row">
                
                    <div class="sec-title text-center white wow animated fadeInDown">
                        <h2>FOLLOW US</h2>
                        <p>Beautifully simple follow buttons to help you get followers on</p>
                    </div>
                    
                    <ul class="social-button">
                        <li class="wow animated zoomIn"><a href="#"><i class="fa fa-facebook fa-2x"></i></a></li>
                        <li class="wow animated zoomIn" data-wow-delay="0.3s"><a href="#"><i class="fa fa-twitter fa-2x"></i></a></li>                         
                    </ul>
                    
                </div>
            </div>
        </div>
    </section>
    <!-- end Social section -->
    
    <!-- Contact section -->
    <section id="contact" >
        <div class="container">
            <div class="row">
                
                <div class="sec-title text-center wow animated fadeInDown">
                    <h2>Contact</h2>
                    <p>Leave a Message</p>
                </div>
                
                
                <div class="col-md-7 contact-form wow animated fadeInLeft">
                    <form action="#" method="post">
                        <div class="input-field">
                            <input type="text" name="name" class="form-control" placeholder="Your Name...">
                        </div>
                        <div class="input-field">
                            <input type="email" name="email" class="form-control" placeholder="Your Email...">
                        </div>
                        <div class="input-field">
                            <input type="text" name="subject" class="form-control" placeholder="Subject...">
                        </div>
                        <div class="input-field">
                            <textarea name="message" class="form-control" placeholder="Messages..."></textarea>
                        </div>
                        <button type="submit" id="submit" class="btn btn-blue btn-effect">Send</button>
                    </form>
                </div>
                
                <div class="col-md-5 wow animated fadeInRight">
                    <address class="contact-details">
                        <h3>Contact Us</h3>                     
                        <p><i class="fa fa-pencil"></i>Phoenix Inc.<span>PO Box 345678</span> <span>Little Lonsdale St, Melbourne </span><span>Australia</span></p><br>
                        <p><i class="fa fa-phone"></i>Phone: (415) 124-5678 </p>
                        <p><i class="fa fa-envelope"></i>website@yourname.com</p>
                    </address>
                </div>
    
            </div>
        </div>
    </section>
    <!-- end Contact section -->
    
    <section id="google-map">
        <div id="map-canvas" class="wow animated fadeInUp"></div>
    </section>
</div>