<form enctype="multipart/form-data">
    <div class="panel-body">
        <div class="alert main_error_wrapper" role="alert" style="display:none;">
            <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <span id="error_container"></span>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">*Event Name: </label>
            <div class="col-md-6 col-xs-12">                                            
                <input type="text" id="name" ng-model="name" class="event_name form-control" placeholder="Enter Event Name">
            </div>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">Short Description: </label>
            <div class="col-md-6 col-xs-12">                                            
                <textarea id="short_description" ng-model="short_description" placeholder="Enter Short Description" class="short_description form-control"></textarea>
            </div>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">*Content: </label>
            <div class="col-md-6 col-xs-12">
                <textarea id="content" ng-model="content" class="content form-control"></textarea>
            </div>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">*Start Datetime: </label>
            <div class="col-md-9 col-xs-12">
                <div id="start_datetime_container" class="input-group col-md-8">
                    <input type="text" id="start_date" ng-model="start_date" class="form-control start_date" data-date-format="yyyy-mm-dd" data-date-viewmode="years" placeholder='Select Start Date'>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                    <input type="text" id="start_time" ng-model="start_time" class="form-control start_time" placeholder="Select Start Time">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">*End Datetime: </label>
            <div class="col-md-9 col-xs-12">
                <div id="end_datetime_container" class="input-group col-md-8">
                    <input type="text" id="end_date" ng-model="end_date" class="form-control end_date" data-date-format="yyyy-mm-dd" data-date-viewmode="years" placeholder='Select End Date'>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                    <input type="text" id="end_time" ng-model="end_time" class="form-control end_time" placeholder="Select End Time">
                    <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">*Is Active: </label>
            <div class="col-md-4 col-xs-12">                                    
                <label class="check"><div class="iradio_minimal-grey checked" style="position: relative;"><input type="radio" class="iradio is_active" ng-model="is_active" name="is_active" value="1" checked="checked"></div> Active</label>&nbsp;&nbsp;&nbsp;
                <label id="is_active_container" class="check"><div class="iradio_minimal-grey " style="position: relative;"><input type="radio" ng-model="is_active" class="iradio is_active" name="is_active" value="0"></div>Inactive</label>
            </div>
        </div>

        <div class="form-group col-md-12">
            <label class="col-md-3 col-xs-12 control-label">Images: </label>
            <div class="col-md-6 col-xs-12">
                <input type="file" id="images" name="images[]" class="form-control images" ngf-select="uploadFiles($files)" multiple accept="'image/*'"/>
                <div class="gallery" id="links">
                    <a ng-repeat="image in existing_images" class="gallery-item" href="{{image.image_path}}" title="{{image.image_path}}" data-gallery="">
                        <div class="image">
                            <span class="helper"></span>
                            <img ng-src="{{utilService.formatImagePath(image.image_path, 'THUMB')}}" alt="{{utilService.formatImagePath(image.image_path, 'THUMB')}}" onerror="this.src='/assets/images/no_image_default.png'">    
                            <ul class="gallery-item-controls">
                                <li><span class="file_remove" data-path="{{image.path}}" title="Click to remove image"><i class="fa fa-times"></i></span></li>
                            </ul>                                                                    
                        </div>                            
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-footer" style="text-align:center;">
        <button id="add_event" class="btn btn-success btn-lg" ng-click="this[save_btn_action](unique_id)">{{save_btn_text}}</button>
    </div>
</form>
<!-- BLUEIMP GALLERY -->
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <div class="slides"></div>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>      
<!-- END BLUEIMP GALLERY -->
