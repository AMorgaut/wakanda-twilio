/**
 * @module Twillio/core/REST
 * @author alexandre.morgaut@gmail.com
 **/

var
	baseURL,
	Base64,
	accountSid,
	authorization,
	applicationSid;

baseURL = 'https://api.twilio.com/2010-04-01/';
Base64 = require('wakanda-twilio/lib/base64').Base64;

/**
 * @method configure
 * @param {String} account
 * @param {String} authToken
 * @param {String} [appSid]
 **/
exports.configure = function Twilio_core_REST_configure(account, authToken, appSid) {
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
exports.sendRequest = function Twilio_REST_sendRequest(method, service, params, successCallback, errorCallback, data) {

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
		urlEncodedParams = urlEncodedParams.join('&');

		if (method === 'POST' || method === 'PUT') {
			data = urlEncodedParams;
		} else {
			url += '?' + urlEncodedParams;
		}
	}

	xhr = new XMLHttpRequest();
	xhr.open(method, url, true); // explicit synchronous XHR mode
	xhr.setRequestHeader('Authorization', authorization);

	if (data) {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
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

/**
 * @method applyOptions
 * @param {Object} params
 * @param {Object} options
 * @param {Array} selection
 **/
exports.applyOptions = function Twilio_core_REST_applyOptions(params, options, selection) {
	selection.forEach(function Twilio_core_REST_applyOptions_forEach(optionName) {
		params[optionName] = options[optionName];
	});
};
