/**
 * @module Twillio/Notifications
 * @author alexandre.morgaut@gmail.com
 **/

var
	SERVICE_NAME,
	restClient;


SERVICE_NAME = 'Notifications';

restClient = require('wakanda-twilio/core/rest');

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

	restClient.applyOptions(
		params,
		options,
		[
			/* 
			Only show notifications for the integer log level corresponding to the type of notification: 
			0 is ERROR, 1 is WARNING, 2 is INFO, and 3 is DEBUG.
			*/
			'Log',

			/* 
			Only show notifications for this date. Should be formatted as YYYY-MM-DD. 
			Although inequalities are not supported in this interface, 
			when making your own request you can also specify an inequality, 
			such as MessageDate<=YYYY-MM-DD for messages logged at or before midnight on a date, 
			and MessageDate>=YYYY-MM-DD for messages logged at or after midnight on a date.
			*/
			'MessageDate',
		]
	);

	restClient.applyPaging(params, options);

	return restClient.sendRequest('GET', SERVICE_NAME, params);

};

/**
 * @method get
 * @param {String} notificationId
 * @return {Object}
 **/
exports.get = function twillio_Notification_get(notificationId) {

	return restClient.sendRequest('GET', SERVICE_NAME + '/' + notificationId);

};


/**
 * @method remove
 * @param {string} notificationSid A 34 character string that uniquely identifies this resource.
 * @return {Object}
 **/
exports.remove = function twillio_Notification_delete(notificationSid) {

	return restClient.sendRequest('DELETE', SERVICE_NAME + '/' + notificationSid);

};