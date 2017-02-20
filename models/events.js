var events = db.collection('events');

exports.add = function(data, callback) {
	events.insert(data, {}, function(err, dt) {
		return callback(dt);
	});
};

exports.getList = function(callback) {
	events.find({}, {}).toArray(function (err, list) {
		return callback(list);
	});
};
