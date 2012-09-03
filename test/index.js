
var testSuite = require('test');
var account = require('./test-account');

exports.run = function Twilio_Test_run() {
	testSuite.run(account);
};