﻿/**
 * @module Twillio/Transcription
 **/

var
	restClient;

restClient = require('./rest');

/**
 * @method getList
 * @param {Object} options
 * @return {Object}
 **/
exports.getList = function twillio_Transcription_getList(options) {

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
		'Transcriptions',
		params
	);

};

/**
 * @method get
 * @param {String} transcriptionId
 * @return {Object}
 **/
exports.get = function twillio_Transcription_get(transcriptionId) {

	return restClient.sendRequest(
		'GET',
		'Transcriptions/' + transcriptionId
	);

};

