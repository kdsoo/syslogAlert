var config = require('config');
var debug = require('debug')('services:loghandler');
Tail = require('tail').Tail;
var syslog = config.get("logpath.syslog");
syslogHandler = new Tail(syslog);
var events = require('./localEvents').Event;

var os = require('os');
var hostname = os.hostname();
var sysinfo = "(OS: " + os.platform() + " (" + os.release() + "," + os.arch() + ")";

var keywords = config.get("logparser.keywords");
var separators = config.get("logparser.separators");

function inspectLog(log) {
	var tokens = log.split(new RegExp(separators.join('|'), 'g'));
	var ret = false;

	debug(tokens);
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
	debug(data)
	if (inspectLog(data)) {
		console.log("log event report");
		var message = {"title": "[syslog] " + hostname + sysinfo
			+ " error occured", "body": data};

		// broadcast alert to be fetched by messaging services
		events.emit("alert", message);
	}
});

syslogHandler.on("error", function(error) {
	console.log('syslogHandler ERROR: ', error);
});

console.log("[ syslog handler initiated ]");
