﻿var
	assert,
	accountSvc;

assert = require('assert');
accountSvc= require('wakanda-twilio/account');

exports['test account.getList()'] = function Twilio_Test_Accounts_getList() {
    var accountList = accountSvc.getList();
    assert.strictEqual(accountList instanceof Error, false, 'no error during the request');
    assert.strictEqual(accountList.start, 0, 'list result has a start property equal to 0');
};

exports['test account.get()'] = function Twilio_Test_Accounts_get() {
    var account = accountSvc.get();
    assert.strictEqual(account instanceof Error, false, 'no error during the get request');
};

exports['test account.get(id)'] = function Twilio_Test_Accounts_get_with_sid() {
    var accounts = accountSvc.getList().elements;
    var account = accountSvc.get(accounts[0].sid);
    assert.strictEqual(account instanceof Error, false, 'no error during the get request with a sid');
};