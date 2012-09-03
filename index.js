var restClient;

restClient = require('./rest');

exports.account = require('./account');
exports.sms = require('./sms');
exports.notification = require('./notification');
exports.transcription = require('./transcription');
exports.reccording = require('./reccording');
exports.call = require('./call');

exports.configure = function Twilio_configure(accountSid, AuthToken, applicationSid) {
	restClient.configure(accountSid, AuthToken, applicationSid);
};