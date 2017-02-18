var config = require('./config');
Tail = require('tail').Tail;
var syslog = config.logpath.syslog;
syslogHandler = new Tail(syslog);

var PushBullet = require('pushbullet');
var PBkey = config.pushbullet.key;
var msgPusher = new PushBullet(PBkey);
var allDevices = '';

var os = require('os');
var hostname = os.hostname();
var sysinfo = "(OS: " + os.platform() + " (" + os.release() + "," + os.arch() + ")";

var keywords = config.logparser.keywords;
var separators = config.logparser.separators;

function inspectLog(log) {
	var tokens = log.split(new RegExp(separators.join('|'), 'g'));
	var ret = false;

	console.log("before for");
	for (var i = 0; tokens.length; i++) {
		for (var l = 0; l < keywords.length; l++) {
			if (tokens[i] === keywords[l]) {
				console.log("Keyword match " + tokens[i]);
				return true;
			}
		}
	}
	return ret;
}

syslogHandler.on("line", function(data) {
	console.log(data);
	if (inspectLog(data)) {
		console.log("log event report");
		msgPusher.devices(function(error, response) {
			if (error) console.log("pusher error: " + error);

			msgPusher.note(allDevices, hostname + sysinfo + " error occured", data, function(err, res) {
				if (err) console.error(err);
			});
		});
	}
});

syslogHandler.on("error", function(error) {
	console.log('syslogHandler ERROR: ', error);
});

console.log("syslog alert service initiated");
