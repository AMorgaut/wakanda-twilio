/**
 * @module Twillio/Recording
 **/

var
	restClient;

restClient = require('./rest');

/**
 * @method getList
 * @param {Object} [options]
 * @return {Object}
 **/
exports.getList = function twillio_Recording_getList(options) {

	var
		params;

	params = {};
	options = options || {};

	if (options.hasOwnProperty('CallSid')) {
		/* 
		Show only recordings made during the call given by this sid.
		*/
		params.CallSid = options.CallSid;
	}

	if (options.hasOwnProperty('DateCreated')) {
		/* 
		Only show recordings for this date. 
		Should be formatted as YYYY-MM-DD. 
		Although inequalities are not supported in this interface, 
		when making your own request you can also specify an inequality, 
		such as DateCreated<=YYYY-MM-DD for recordings made at or before midnight on a date, 
		and DateCreated>=YYYY-MM-DD for recordings made at or after midnight on a date.
		*/
		params.DateCreated = options.DateCreated;
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
		'Recordings',
		params
	);

};

/**
 * @method get
 * @param {String} recordingSid
 * @return {Object}
 **/
exports.get = function twillio_Recording_get(recordingSid) {

	return restClient.sendRequest(
		'GET',
		'Recordings/' + recordingSid
	);

};

/**
 * @method remove
 * @param {String} recordingSid
 * @return {Object}
 **/
exports.remove = function twillio_Recording_remove(recordingSid) {

	return restClient.sendRequest(
		'DELETE',
		'Recordings/' + recordingSid
	);

};

/**
 * @method getTranscriptionsList
 * @param {String} recordingId
 * @param {Object} [options]
 * @return {Object}
 **/
exports.getTranscriptionsList = function twillio_Recording_getTranscriptionsList(recordingId, options) {

	var
		params;

	params = {};
	options = options || {};

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
		'Recordings/' + recordingId + '/Transcriptions',
		params
	);

};

