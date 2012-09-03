/**
 * @module Twillio/Calls
 **/

var
	restClient;

restClient = require('./rest');

/**
 * @method get
 * @param {String} callSId
 * @return {Object}
 **/
exports.get = function twillio_Call_get(callSId) {

	return restClient.sendRequest(
		'GET',
		'Calls/' + callSId
	);

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

	if (options.hasOwnProperty('To')) {
		/* 
		Only show calls to this phone number.
		*/
		params.To = options.To;
	}

	if (options.hasOwnProperty('From')) {
		/* 
		Only show calls from this phone number.
		*/
		params.From = options.From;
	}

	if (options.hasOwnProperty('Status')) {
		/* 
		Only show calls currently in this status.
		*/
		params.Status = options.Status;
	}

	if (options.hasOwnProperty('StartTime')) {
		/* 
		Only show calls for this date. 
		Should be formatted as YYYY-MM-DD. 
		Although inequalities are not supported in this interface, 
		when making your own request you can also specify an inequality, 
		such as StartTime<=YYYY-MM-DD for calls made at or before midnight on a date, 
		and StartTime>=YYYY-MM-DD for calls made at or after midnight on a date.
		*/
		params.StartTime = options.StartTime;
	}

	if (options.hasOwnProperty('EndTime')) {
		/* 
		Only show calls for this date. 
		Should be formatted as YYYY-MM-DD. 
		Although inequalities are not supported in this interface, 
		when making your own request you can also specify an inequality, 
		such as EndTime<=YYYY-MM-DD for calls ended at or before midnight on a date, 
		and EndTime>=YYYY-MM-DD for calls ended at or after midnight on a date.
		*/
		params.EndTime = options.EndTime;
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
		'Calls',
		params
	);

};


/**
 * @method make
 * @param {String} from
 * @param {String} to
 * @param {Object} options
 * @returns {Object}
 **/
exports.make = function Twillio_Call_make(from, to, options) {

	var
		params;

	params = {
		From: from,
		To: to,
		Url: 'http://about.me/amorgaut/'
	};
	options = options || {};

	if (options.hasOwnProperty('SendDigits')) {
		/* 
		A string of keys to dial after connecting to the number. 
		Valid digits in the string include: any digit (0-9), '#', '*' and 'w' (to insert a half second pause).
		For example, if you connected to a company phone number, and wanted to pause for one second, 
		dial extension 1234 and then the pound key, use "ww1234#". 
		Remember to URL-encode this string, since the '#' character has special meaning in a URL.
		*/
		params.SendDigits = options.SendDigits;
	}

	if (options.hasOwnProperty('IfMachine')) {
		/* 
		Tell Twilio to try and determine if a machine (like voicemail) or a human has answered the call.
		Possible values are Continue and Hangup. See the answering machines section for more info.
		*/
		params.IfMachine = options.IfMachine;
	}

	if (options.hasOwnProperty('Timeout')) {
		/* 
		The integer number of seconds that Twilio should allow the phone to ring before assuming there is no answer.
		Default is 60 seconds, the maximum is 999 seconds. 
		Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.
		Also see the answering machine section for other solutions.
		*/
		params.Timeout = options.Timeout;
	}

	if (options.hasOwnProperty('Record')) {
		/* 
		Set this parameter to 'true' to record the entirety of a phone call. 
		The RecordingUrl will be sent to the StatusCallback URL. Defaults to 'false'.
		*/
		params.Record = options.Record;
	}

	return restClient.sendRequest(
		'POST',
		'Calls',
		params
	);

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

	return restClient.sendRequest(
		'POST',
		'Calls/' + callSid,
		params
	);

};
