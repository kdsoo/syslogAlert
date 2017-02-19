# syslogAlert
Simple log monitoring service which alerts user when registered keyword appears in syslog event.
## Key fetures
### Realtime syslog monitoring and alert
This service supports tapping on syslog file and push alert to user accoding to a list of keyword registry.

### Various messaging platform support
- Pushbullet
- Telegram (TBD)
- Google hangouts (TBD)
- Twitter (TBD)

## System requirements
- *Nix operating system
: System which supports file based logging
- Node.js
: tested on v4.4.7

## Caution
Check if your id running sysAlert has permission to the logfile you want to tap.

## Configuration
```
git clone git@github.com:kdsoo/syslogAlert.git
cd syslogAlert
npm install
cp config/default_sample.json config/default.json
## open and edit default.json file regarding the comment
## don't forget to put apropriate API key for each messaging service or you wont get any alert.
node index
(I recommend to use pm2 to make syslogAlert always up while the system is running)
```
