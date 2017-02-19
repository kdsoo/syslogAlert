var config = require('config');
var debug = require('debug')('main');
var logHandler = require('./services/loghandler');
var events = require('./services/localEvents').Event;
var pushBullet = require('./services/pushbullet');

// Put main service code here if necessary

console.log("[ syslog alert service initiated ]");
