exports.home = function(req, res, callback) {
	res.render('client/index.jade', {title : 'This is home page'});
};
