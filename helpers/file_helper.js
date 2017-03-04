var _ = require('underscore');
var path = require('path');
var im = require("imagemagick");
var errorCodes = require('../config/error');
var fs = require("fs");
var moment = require("moment");
var async = require("async");

const UPLOAD_SIZES = [
    {
        'key' : '',
        'width' : '100%'
    },
    {
        'key' : 'MID',
        'width' : 300
    },
    {
        'key' : 'THUMB',
        'width' : 75
    }
];
// var cloudinary = require('cloudinary');

// cloudinary.config({ 
//   cloud_name: 'dkoz8d6kh', 
//   api_key: '966141553127763', 
//   api_secret: '-BuTtS99fHLFTTzi0cG7CQ1xWRs' 
// });

function uploadImages (images, type, callback) {
    var images_ext = ['png', 'jpg', 'jpeg', 'gif'];

    type = type === undefined ? 'HOME' : type.toUpperCase();

    var images_list = [];
    var gallery_list = [];

    async.series([function(cb1_parent) {
        var error_cnt = 0;
        async.eachSeries(images, function(img, cb1) {
            var ext = path.extname(img.originalname);
            if(_.indexOf(images_ext, ext.replace('.', '')) == -1) {
                var error = errorCodes.error_400.invalid_file;
                error.responseParams.message = "Please provide png, jpg, jpeg or gif files";
                error_cnt++;
                callback(error);
            } else {
                cb1();
            }
        }, function(err) {
            if(err) {
                cb1_parent(err);
            } else {
                if(error_cnt == 0) {
                    cb1_parent();
                }
            }
        });
    }, function(cb2_parent) {
        async.eachSeries(images, function(img, cb) {
            console.log(img, ":::images");
            var ext = path.extname(img.originalname);
            var imageName = type + '_' + moment().valueOf() + ext;
            var newPath = img.path;

            var img_path = ROOT_DIR + "public/uploads/" + type;
            if (!fs.existsSync(img_path)){
                fs.mkdirSync(img_path);
            }

            var i = 0;
            async.eachSeries(UPLOAD_SIZES, function(sizes, cb2) {
                var key = sizes.key;

                img_path += "/" + key;
                if (!fs.existsSync(img_path)){
                    fs.mkdirSync(img_path);
                }

                im.resize({
                    srcPath: newPath,
                    dstPath: img_path + "/" + imageName,
                    strip : false,
                    width : sizes.width
                }, 
                function(err)
                {
                    if (err){
                        var error = errorCodes.error_400.file_upload_failed;
                        callback(error);
                    } else {
                        if(i == 0) {
                            var default_img = images_list.length == 0 ? 1 : 0; 
                            images_list[images_list.length] = {'default' : default_img, 'path' : '/uploads/' + type + '/' + imageName, 'image_path' : BASE_URL + 'uploads/' + type + '/' + imageName};
                            gallery_list[gallery_list.length] = {'type' : type, 'path' : '/uploads/' + type + imageName, 'image_path' : BASE_URL + 'uploads/' + type + '/' + imageName};
                        }
                        i++;
                        cb2();
                  //    cloudinary.uploader.upload(ROOT_DIR + "/uploads/" + imageName, function(result) { 
                        //   console.log(result, "::::result"); 
                        // });
                    }
                });
            }, function(err) {
                if (fs.existsSync(ROOT_DIR + img.path)){
                    fs.unlink(ROOT_DIR + img.path);
                }
                cb();            
            });


        }, function(err) {
            callback(null, {'images_list' : images_list, 'gallery_list' : gallery_list});
            
        });
    }]);

};

exports.uploadImages = uploadImages;