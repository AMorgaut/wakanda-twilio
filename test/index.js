
var
	TEST_SUITES,
	//test,
	twilioCore;

TEST_SUITES = [
//	'account',
//	'application',
//	'sms',
	'lib-base64'
];

//test = require('test');
twilioCore = require('wakanda-twilio/core/rest');

function runTestSuite(testSuite) {
	Object.keys(testSuite).forEach(function runTest(testName) {
		testSuite[testName]();
		console.info('SUCCESS', testName);
	});
}

exports.init = function Twilio_Test_Init(sid, token) {
	twilioCore.configure(sid, token);
}

exports.run = function Twilio_Test_run() {
	TEST_SUITES.forEach(
		function launchTestSuite(testSuiteId) {
			runTestSuite(require('./test-' + testSuiteId));
			//test.run(require('./test-' + testSuiteId));
		}
	);
};