/**
 * @module Twillio/Calls
 * @author alexandre.morgaut@gmail.com
 **/

var
	SERVICE_NAME,
	restClient,
	twimlFactory;


SERVICE_NAME = 'Calls';

restClient = require('wakanda-twilio/core/rest');
twimlFactory = require('wakanda-twilio/core/twiml');


/**
 * @method get
 * @param {String} callSId
 * @return {Object}
 **/
exports.get = function twillio_Call_get(callSId) {

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + callSId);

};


/**
 * @method getList
 * @param {Object} options
 * @return {Object}
 **/
exports.getList = function twillio_Calls_getList(options) {

	var
		params;

	params = {};
	options = options || {};

	/*
	Dates Should be formatted as YYYY-MM-DD. 
	Although inequalities are not supported in this interface, 
	when making your own request you can also specify an inequality, 
	such as StartTime<=YYYY-MM-DD for calls made at or before midnight on a date, 
	and StartTime>=YYYY-MM-DD for calls made at or after midnight on a date.
	*/
	restClient.applyOptions(
		params,
		options,
		[
			'To', // Filter to calls to this phone number.
			'From', // Filter to calls from this phone number.
			'Status', // Filter to calls currently in this status.
			'StartTime', // Filter to calls starting at this date.
			'EndTime', // Filter to calls ending at this date.
		]
	);

	restClient.applyPaging(params, options);

	return restClient.sendRequest('GET', SERVICE_NAME, params);

};


/**
 * @method make
 * @param {String} from
 * @param {String} to
 * @param {Object|String} actions
 * @param {Object} [options]
 * @returns {Object}
 **/
exports.make = function Twillio_Call_make(from, to, actions, options) {

	var
		params;

	params = {
		From: from,
		To: to,
		Url: typeof actions === 'string' ? actions : twimlFactory.createURL(actions)
	};
	options = options || {};

	restClient.applyOptions(
		params,
		options,
		[
			/* 
			A string of keys to dial after connecting to the number. 
			Valid digits in the string include: any digit (0-9), '#', '*' and 'w' (to insert a half second pause).
			For example, if you connected to a company phone number, and wanted to pause for one second, 
			dial extension 1234 and then the pound key, use "ww1234#". 
			Remember to URL-encode this string, since the '#' character has special meaning in a URL.
			*/
			'SendDigits',

			/* 
			Tell Twilio to try and determine if a machine (like voicemail) or a human has answered the call.
			Possible values are Continue and Hangup. See the answering machines section for more info.
			*/
			'IfMachine',

			/* 
			The integer number of seconds that Twilio should allow the phone to ring before assuming there is no answer.
			Default is 60 seconds, the maximum is 999 seconds. 
			Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.
			Also see the answering machine section for other solutions.
			*/
			'Timeout',

			/* 
			Set this parameter to 'true' to record the entirety of a phone call. 
			The RecordingUrl will be sent to the StatusCallback URL. Defaults to 'false'.
			*/
			'Record'
		]
	);

	return restClient.sendRequest('POST', SERVICE_NAME, params);

};


/**
 * @method modifyLiveCall
 * @param {String} callSid
 * @param {String} status
 * @returns {Object}
 **/
exports.modifyLiveCall = function Twillio_Call_modifyLiveCall(callSid, status) {

	var
		params;

	params = {
		Status: status
	};

	return restClient.sendRequest('POST', SERVICE_NAME + '/' + callSid, params);

};
