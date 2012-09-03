/**
 * @module Twillio/account
 **/
 
var
	restClient;

restClient = require('./rest');

/**
 * @method get
 * @param {string} [accountSid]
 * @return {Object}
 **/
exports.get = function Twillio_Account_get(accountSid) {
	
	accountSid = accountSid || "";
	
	return restClient.sendRequest(
		'GET', 'Accounts/' + accountSid
	);
	
};


/**
 * @method update
 * @param {Object} options
 * @return {Object}
 **/
exports.update = function Twillio_Account_update(options) {
	
	var
		params,
		accountSid;
	
	params = {};
	options = options || {};
	
	if ('accountSid' in options) {
		accountSid = options.accountSid;	
	} else {
		accountSid = "";
	}
	
	if ('friendlyName' in options) {
		/* 
		The integer number of seconds that Twilio should allow the phone to ring before assuming there is no answer.
		Default is 60 seconds, the maximum is 999 seconds. 
		Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.
		Also see the answering machine section for other solutions.
		*/
		params.FriendlyName = options.friendlyName;	
	}
	
	if ('status' in options) {
		/* 
		The integer number of seconds that Twilio should allow the phone to ring before assuming there is no answer.
		Default is 60 seconds, the maximum is 999 seconds. 
		Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.
		Also see the answering machine section for other solutions.
		*/
		params.Status = options.status;	
	}
	
	return restClient.sendRequest(
		'GET', 'Accounts/' + accountSid, params
	);
	
};

/**
 * @method updateInfos
 * @param {Object} options
 * @return {Object}
 **/
exports.createSubAccount = function Twillio_Account_createSubAccount(options) {
	
	var
		params;
	
	params = {};
	options = options || {};
	
	if ('friendlyName' in options) {
		/* 
		The integer number of seconds that Twilio should allow the phone to ring before assuming there is no answer.
		Default is 60 seconds, the maximum is 999 seconds. 
		Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.
		Also see the answering machine section for other solutions.
		*/
		params.FriendlyName = options.friendlyName;	
	}
	
	return restClient.sendRequest(
		'POST', 'Accounts', params
	);
	
};

/**
 * @method getlist
 * @return {Object}
 **/
exports.getlist = function Twillio_Account_getlist() {
	
	return restClient.sendRequest(
		'GET', 'Accounts'
	);
	
};