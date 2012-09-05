/**
 * @module Twillio/Queues
 * @author alexandre.morgaut@gmail.com
 *
 * Just a draft, you can not yet dequeue members
 *
 **/

var
	restClient;

restClient = require('./core/rest');

/**
 * @method getList
 * @param {Object} [options]
 * @return {Object}
 **/
exports.getList = function twillio_Queue_getList(options) {

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
		'Queues',
		params
	);

};

/**
 * @method get
 * @param {String} notificationId
 * @return {Object}
 **/
exports.get = function twillio_Queue_get(queueId) {

	return restClient.sendRequest(
		'GET',
		'Queues/' + queueId
	);

};


/**
 * @method update
 * @param {string} queueId
 * @param {Object} [options]
 * @return {Object}
 **/
exports.update = function twillio_Queue_update(queueId, options) {

	var
		params;

	params = {};
	options = options || {};

	if (options.hasOwnProperty('FriendlyName')) {
		/* 
		A unique identifier for this queue.
		*/
		params.FriendlyName = options.FriendlyName;
	}

	if (options.hasOwnProperty('MaxSize')) {
		/* 
		The maximum size of this queue. The default is 100. The maximum is 1000.
		*/
		params.MaxSize = options.MaxSize;
	}

	return restClient.sendRequest(
		'POST',
		'Queues/' + queueId,
		params
	);

};

/**
 * @method create
 * @param {Object} [options]
 * @return {Object}
 **/
exports.create = function twillio_Queue_create(options) {

	var
		params;

	params = {};
	options = options || {};

	if (options.hasOwnProperty('FriendlyName')) {
		/* 
		A unique identifier for this queue.
		*/
		params.FriendlyName = options.FriendlyName;
	}

	if (options.hasOwnProperty('MaxSize')) {
		/* 
		The maximum size of this queue. The default is 100. The maximum is 1000.
		*/
		params.MaxSize = options.MaxSize;
	}

	return restClient.sendRequest(
		'POST',
		'Queues',
		params
	);

};

/**
 * @method remove
 * @param {string} queueId
 * @return {Object}
 **/
exports.remove = function twillio_Queue_remove(queueId) {

	return restClient.sendRequest(
		'DELETE',
		'Queues/' + queueId
	);

};

/**
 * @method getMembers
 * @param {string} queueId
 * @return {Object}
 **/
exports.getMembers = function twillio_Queue_getMembers(queueId) {

	return restClient.sendRequest(
		'GET',
		'Queues/' + queueId + '/Members'
	);

};

/**
 * @method getMembers
 * @param {string} queueId
 * @param {string} memberId
 * @return {Object}
 **/
exports.getMember = function twillio_Queue_getMembers(queueId, memberId) {

	return restClient.sendRequest(
		'GET',
		'Queues/' + queueId + '/Members/' + memberId
	);

};

