/**
 * @module Twilio/main
 * @author alexandre.morgaut@gmail.com
 **/

var restClient;

restClient = require('./core/rest');

exports.account = require('./account');
exports.sms = require('./sms');
exports.notification = require('./notification');
exports.transcription = require('./transcription');
exports.reccording = require('./reccording');
exports.queue = require('./queue');
exports.call = require('./call');

exports.configure = function Twilio_configure(accountSid, AuthToken, applicationSid) {
	restClient.configure(accountSid, AuthToken, applicationSid);
};