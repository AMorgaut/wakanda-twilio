﻿var assert = require('assert');
var account = require('wakanda-twilio/account');

exports['test getList()'] = function Twilio_Test_Accounts_getList() {
    var accountList = account.getList();
    assert.strictEqual(accountList instanceof Error, false, 'no error during the request');
    assert.strictEqual(accountList.start, 0, 'list result has a start property equal to 0');
};

exports['test get()'] = function Twilio_Test_Accounts_get() {
    var account = account.get();
    assert.strictEqual(account instanceof Error, false, 'no error during the get request');
};

exports['test get(id)'] = function Twilio_Test_Accounts_get_with_sid() {
    var accounts = account.getList().accounts;
    var account = account.get(accounts[0].sid);
    assert.strictEqual(account instanceof Error, false, 'no error during the get request with a sid');
};