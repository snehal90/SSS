var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var vhost = require('vhost');
var multer = require('multer');
var env_config = require('./config/env')();

console.log(env_config, "::::env_config");

//global variables
global.ROOT_DIR = __dirname + '/';
global.BASE_URL = '//' + env_config.api_host + ':' + env_config.port + '/';
global.PWD_SALT = 'PINKPYTHON';
global.SECRET_KEY = 'dBBmapwEBWUkcUg7xP8Buvp6vc36truv';
global.JWT_SECRET_KEY = 'SsQcqWRZDYsnsJBaHQvmDE5q4r4t75Mb';

var app = express();
var db_file = require('./db');
db = db_file.connectToServer();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('host', env_config.api_host);
app.set('port', env_config.port);
// process.env.PORT = env_config.port;
// process.env.HOST = env_config.host;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(env_config.mode));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest:'./temp/'}).any());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, secret_key, access_token');
  res.header("Access-Control-Expose-Headers", "access_token");
  next();
  // if ('OPTIONS' === req.method) {
    // next();
    // res.sendStatus(200);
  // } else {
  // }
};

app.use(allowCrossDomain);

// error handlers

// development error handler
// will print stacktrace
if (env_config.mode === 'staging' || env_config.mode == 'local') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
console.log(env_config.api_host + ':' + env_config.port, '::::in app');
console.log(env_config.client_host + ':' + env_config.port, '::::in client app');
// console.log(db_obj);
// var clientRouter = require('./config/clientRouter')(express);
var adminRouter = require('./config/adminRouter')(express);

app.use(vhost(env_config.api_host, adminRouter.obj));
// app.use(vhost(env_config.client_host, clientRouter.obj));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
module.exports = app;
