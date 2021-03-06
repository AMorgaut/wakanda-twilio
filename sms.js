﻿/**
 * @module Twillio/SMS
 * @author alexandre.morgaut@gmail.com
 **/

var
	restClient;

restClient = require('./core/rest');

/**
 * @method getList
 * @param {Object} [options]
 * @return {Object}
 **/
exports.getList = function twillio_SMS_getList(options) {

	var
		params;

	params = {};
	options = options || {};

	if (options.hasOwnProperty('From')) {
		/* 
		Only show SMS messages from this phone number
		*/
		params.From = options.From;
	}

	if (options.hasOwnProperty('To')) {
		/* 
		Only show SMS messages to this phone number.
		*/
		params.To = options.To;
	}

	if (options.hasOwnProperty('DateSent')) {
		/* 
		Only show messages for this date. Should be formatted as YYYY-MM-DD. 
		Although inequalities are not supported in this interface, 
		when making your own request you can also specify an inequality, 
		such as DateSent<=YYYY-MM-DD for messages sent at or before midnight on a date, 
		and DateSent>=YYYY-MM-DD for messages sent at or after midnight on a date.
		*/
		params.DateSent = options.DateSent;
	}

	if (options.hasOwnProperty('PageSize')) {
		/* 
		How many resources to return in each list page. The default is 50, and the maximum is 1000.
		*/
		params.PageSize = options.PageSize;
	}

	if (options.hasOwnProperty('Page')) {
		/* 
		Which page to view. Zero-indexed, so the first page is 0. The default is 0.
		*/
		params.Page = options.Page;
	}

	return restClient.sendRequest(
		'GET',
		'SMS/Messages',
		params
	);

};

/**
 * @method get
 * @param {String} smsId
 * @return {Object}
 **/
exports.get = function twillio_SMS_get(smsId) {

	return restClient.sendRequest(
		'GET',
		'SMS/Messages/' + smsId
	);

};



/**
 * @method send
 * @param {string} to The destination phone number. Format with a '+' and country code e.g., +16175551212 (E.164 format). For 'To' numbers without a '+', Twilio will use the same country code as the 'From' number. Twilio will also attempt to handle locally formatted numbers for that country code (e.g. (415) 555-1212 for US, 07400123456 for GB). If you are sending to a different country than the 'From' number, you must include a '+' and the country code to ensure proper delivery
 * @param {string} body The text of the message you want to send, limited to 160 characters
 * @param {string} [from] A Twilio phone number enabled for SMS. Only phone numbers or short codes purchased from Twilio work here; you cannot (for example) spoof SMS messages from your own cell phone number.
 * @return {Object}
 **/
exports.send = function twillio_SMS_send(body, to, from) {

	var
		params;

	params = {
		From: from,
		To: to,
		Body: body
	};

	return restClient.sendRequest(
		'POST',
		'SMS/Messages',
		params
	);

};