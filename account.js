/**
 * @module Twillio/Accounts
 * @author alexandre.morgaut@gmail.com
 **/

var
	restClient;

restClient = require('./core/rest');

/**
 * @method get
 * @param {string} [accountSid]
 * @return {Object}
 **/
exports.get = function Twillio_Account_get(accountSid) {

	accountSid = accountSid || "";

	return restClient.sendRequest(
		'GET',
		'Accounts/' + accountSid
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

	return restClient.sendRequest(
		'GET',
		'Accounts/' + accountSid,
		params
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

	restClient.applyOptions(
		params,
		options,
		[
			'FriendlyName'
		]
	);

	return restClient.sendRequest(
		'POST',
		'Accounts',
		params
	);

};

/**
 * @method getlist
 * @return {Object}
 **/
exports.getlist = function Twillio_Account_getlist() {

	return restClient.sendRequest(
		'GET',
		'Accounts'
	);

};