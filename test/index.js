
var
	TEST_SUITES,
	//test,
	twilioCore;

TEST_SUITES = [
	'lib-base64',
	'core-twiml',
	'mock-http',
	'account',
	'application',
	'sms'
];

//test = require('test');
twilioCore = require('../core/rest');

function runTestSuite(testSuite) {
	Object.keys(testSuite).forEach(function runTest(testName) {
		try {
			testSuite[testName]();
			console.info('SUCCESS', testName);
		} catch(e) {
			console.error('ERROR', testName);
		}
	});
}

exports.init = function Twilio_Test_Init(sid, token) {
	twilioCore.configure(sid, token);
}

exports.setTestMode = twilioCore.setTestMode;

exports.run = function Twilio_Test_run() {
	TEST_SUITES.forEach(
		function launchTestSuite(testSuiteId) {
			runTestSuite(require('./test-' + testSuiteId));
			//test.run(require('./test-' + testSuiteId));
		}
	);
};