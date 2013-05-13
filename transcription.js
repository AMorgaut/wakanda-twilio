/**
 * @module Twillio/Transcription
 * @author alexandre.morgaut@gmail.com
 **/

var
	SERVICE_NAME,
	restClient;

SERVICE_NAME = 'Transcriptions';

restClient = require('./core/rest');

/**
 * @method getList
 * @param {Object} [options]
 * @return {Object}
 **/
exports.getList = function twillio_Transcription_getList(options) {

	var
		params;

	params = {};
	options = options || {};

	restClient.applyPaging(params, options);

	return restClient.sendRequest('GET', SERVICE_NAME, params);

};

/**
 * @method get
 * @param {String} transcriptionId
 * @return {Object}
 **/
exports.get = function twillio_Transcription_get(transcriptionId) {

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + transcriptionId);

};

