/**
 * @module Twillio/Recordings
 * @author alexandre.morgaut@gmail.com
 **/

var
	SERVICE_NAME,
	restClient;


SERVICE_NAME = 'Recordings';

restClient = require('./core/rest');

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

	restClient.applyOptions(
		params,
		options,
		[
			/* 
			Show only recordings made during the call given by this sid.
			*/
			'CallSid',

			/* 
			Only show recordings for this date. 
			Should be formatted as YYYY-MM-DD. 
			Although inequalities are not supported in this interface, 
			when making your own request you can also specify an inequality, 
			such as DateCreated<=YYYY-MM-DD for recordings made at or before midnight on a date, 
			and DateCreated>=YYYY-MM-DD for recordings made at or after midnight on a date.
			*/
			'DateCreated'
		]
	);

	restClient.applyPaging(params, options);

	return restClient.sendRequest('GET', SERVICE_NAME, params);

};

/**
 * @method get
 * @param {String} recordingSid
 * @return {Object}
 **/
exports.get = function twillio_Recording_get(recordingSid) {

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + recordingSid);

};

/**
 * @method remove
 * @param {String} recordingSid
 * @return {Object}
 **/
exports.remove = function twillio_Recording_remove(recordingSid) {

	return restClient.sendRequest('DELETE', SERVICE_NAME + '/' + recordingSid);

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

	restClient.applyPaging(params, options);

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + recordingId + '/Transcriptions', params);

};

