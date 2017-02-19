// Event notifier
var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports.EventHandler = function(arg) {
	var self = this;

	console.log(this);
	this.on('newListener', function(listener) {
		console.log('New event listner joined: ' + listener);
	});
};
util.inherits(this.EventHandler, EventEmitter);

module.exports.listenerCount = function(name) {
	return EventEmitter.listenerCount(name);
};

var EventListener = new EventEmitter();
module.exports.Event = EventListener;
