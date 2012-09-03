/**
 * @module Twillio/rest
 **/

var
	baseURL,
	Base64,
	accountSid,
	authorization,
	applicationSid;

baseURL = 'https://api.twilio.com/2010-04-01/';
Base64 = require('wakanda-twilio/lib/base64').Base64;


exports.configure = function Twilio_configure(account, authToken, appSid) {
	accountSid = account;
	authorization =  'Basic ' + Base64.encode(accountSid + ':' + authToken);
	applicationSid = appSid;
};


/**
 * @method sendRequest
 * @param {String} method
 * @param {String|null} service
 * @param {Object} params
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} data
 **/
exports.sendRequest = function Twilio_Rest_sendRequest(method, service, params, successCallback, errorCallback, data) {

	var
		url,
		xhr,
		urlEncodedParams,
		response;

	url = baseURL;
	if (service.substr(0, 8) !== 'Accounts') {
		// for any other service than "Accounts" the default account Sid must be used
		url += 'Accounts/' + accountSid + '/';
	}
	url += service;
	if (service === 'Accounts/') {
		// if the "Accounts" service is called without Sid, provide the default one
		url += accountSid;
	}
	url += '.json';

	if (params) {
		if (applicationSid) {
			params.ApplicationSid = applicationSid;
		}
		urlEncodedParams = [];
		Object.getOwnPropertyNames(params).forEach(function (paramName, index) {
			urlEncodedParams.push(paramName + '=' + encodeURIComponent(params[paramName]));
		});
		urlEncodedParams = '?' + urlEncodedParams.join('&');
		url += urlEncodedParams;
	}

	xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader('Authorization', authorization);

	if (data) {
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xhr.send(data);
	} else {
		xhr.send();
	}

	if (xhr.status !== 200) {
		response = new Error(xhr.statusText);
		response.details = JSON.parse(xhr.responseText);
	} else {
		response = JSON.parse(xhr.responseText);
	}

	return response;
};
