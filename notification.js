/**
 * @module Twillio/Notifications
 * @author alexandre.morgaut@gmail.com
 **/

var
	restClient;

restClient = require('./core/rest');

/**
 * @method getList
 * @param {Object} options
 * @return {Object}
 **/
exports.getList = function twillio_Notification_getList(options) {

	var
		params;

	params = {};
	options = options || {};

	if (options.hasOwnProperty('Log')) {
		/* 
		Only show notifications for the integer log level corresponding to the type of notification: 
		0 is ERROR, 1 is WARNING, 2 is INFO, and 3 is DEBUG.
		*/
		params.Log = options.Log;
	}

	if (options.hasOwnProperty('MessageDate')) {
		/* 
		Only show notifications for this date. Should be formatted as YYYY-MM-DD. 
		Although inequalities are not supported in this interface, 
		when making your own request you can also specify an inequality, 
		such as MessageDate<=YYYY-MM-DD for messages logged at or before midnight on a date, 
		and MessageDate>=YYYY-MM-DD for messages logged at or after midnight on a date.
		*/
		params.MessageDate = options.MessageDate;
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
		'Notifications',
		params
	);

};

/**
 * @method get
 * @param {String} notificationId
 * @return {Object}
 **/
exports.get = function twillio_Notification_get(notificationId) {

	return restClient.sendRequest(
		'GET',
		'Notifications/' + notificationId
	);

};


/**
 * @method remove
 * @param {string} notificationSid A 34 character string that uniquely identifies this resource.
 * @return {Object}
 **/
exports.remove = function twillio_Notification_delete(notificationSid) {

	return restClient.sendRequest(
		'DELETE',
		'Notifications/' + notificationSid
	);

};