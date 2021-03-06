var
	assert,
	accountSvc,
	PHONE_NUMBER_FROM_TEST,
	PHONE_NUMBER_TO_TEST;

PHONE_NUMBER_FROM_TEST = '+14089161842';
PHONE_NUMBER_TO_TEST = '+33681913684';

assert = require('assert');
smsSvc= require('wakanda-twilio/sms');

exports['test sms.getList()'] = function Twilio_Test_SMS_getList() {
    var smsList = smsSvc.getList();
    assert.strictEqual(smsList instanceof Error, false, 'no error during the request');
    assert.strictEqual(smsList.start, 0, 'list result has a start property equal to 0');
};

exports['test sms.get(id)'] = function Twilio_Test_SMS_get_with_sid() {
    var smsList = smsSvc.getList().elements;
    var sms = smsSvc.get(smsList[0].sid);
    assert.strictEqual(sms instanceof Error, false, 'no error during the get request with a sid');
};

exports['test sms.send(body, to, from)'] = function Twilio_Test_SMS_send() {
    var result = smsSvc.send('success from wakanda-twilio', PHONE_NUMBER_TO_TEST, PHONE_NUMBER_FROM_TEST);
    assert.strictEqual(result instanceof Error, false, 'no error during the send sms request');
    var sms = smsSvc.get(result.sid);
    assert.strictEqual(sms instanceof Error, false, 'no error when retrieving sms info via the get() method');
};
