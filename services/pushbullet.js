var config = require('config');
var debug = require('debug')('services:pushbullet');
var events = require('./localEvents').Event;

var PushBullet = require('pushbullet');
var PBkey = config.get("pushbullet.key");
var msgPusher = new PushBullet(PBkey);
var allDevices = '';

// Event message format: {"title": String, "body": String}
events.on("alert", function(msg) {
	debug(msg);
	debug(msg.title);
	debug(msg.body);
	msgPusher.devices(function(error, response) {
		if (error) console.log("pusher error: " + error);

		msgPusher.note(allDevices, msg.title, msg.body, function(err, res) {
			if (err) console.error(err);
		});
	});
});

console.log("[ pushbullet message pushing service initiated ]");
