/**
 * @module Twillio/Accounts
 * @author alexandre.morgaut@gmail.com
 **/

var
	SERVICE_NAME,
	restClient;


SERVICE_NAME = 'Accounts';

restClient = require('wakanda-twilio/core/rest');


/**
 * @method get
 * @param {string} [accountSid]
 * @return {Object}
 **/
exports.get = function Twillio_Account_get(accountSid) {

	accountSid = accountSid || "";

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + accountSid);

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

	if (options.hasOwnProperty('accountSid')) {
		accountSid = options.accountSid;
	} else {
		accountSid = "";
	}

	restClient.applyOptions(
		params,
		options,
		[
			'FriendlyName',
			'Status'
		]
	);

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + accountSid, params);

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

	restClient.applyOptions(
		params,
		options,
		[
			'FriendlyName'
		]
	);

	return restClient.sendRequest('POST', SERVICE_NAME, params);

};

/**
 * @method getList
 * @param {Object} options
 * @return {Object}
 **/
exports.getList = function Twillio_Account_getlist(options) {

	var
		params;

	params = {};
	options = options || {};

	restClient.applyPaging(params, options);

	return restClient.sendRequest('GET', SERVICE_NAME, params);

};