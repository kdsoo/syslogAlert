exports.host = {
}

exports.logparser = {
	keywords: ["error", "EXT4", "[test]"],
	separators: [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?', '\\[', '\\]']
}

exports.logpath ={
	syslog: "/var/log/syslog"
}

exports.pushbullet = {
	// get access token from pushbullet account setting page: https://www.pushbullet.com/#settings
	key: ''
}
