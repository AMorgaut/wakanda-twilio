/**
 * @module Twillio/core/REST
 * @author alexandre.morgaut@gmail.com
 **/

var
	baseURL,
	HateosInterface,
	accountSid,
	authorization,
	applicationSid;

baseURL = 'https://api.twilio.com/2010-04-01/';
HateosInterface = require('wakanda-twilio/core/hateos').HateosInterface;

/**
 * @method configure
 * @param {String} account
 * @param {String} authToken
 * @param {String} [appSid]
 **/
exports.configure = function Twilio_core_REST_configure(account, authToken, appSid) {
	var
		Base64;

	Base64 = require('wakanda-twilio/lib/base64').Base64;

	accountSid = account;
	authorization =  'Basic ' + Base64.encode(accountSid + ':' + authToken);
	applicationSid = appSid;
};


/**
 * @method setApplication
 * @param {String} appSid
 **/
exports.setApplication = function Twilio_core_REST_setApplication(appSid) {
	applicationSid = appSid;
};


/**
 * @method unsetApplication
 **/
exports.unsetApplication = function Twilio_core_REST_unsetApplication() {
	applicationSid = undefined;
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

	if (xhr.status >= 400) {
		response = new Error(xhr.statusText);
		response.details = JSON.parse(xhr.responseText);
	} else {
		response = JSON.parse(xhr.responseText);
		if (response.uri) {
			HateosInterface.apply(response);
		}
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

		if (options.hasOwnProperty(optionName)) {
			params[optionName] = options[optionName];
		}

	});

};

/**
 * @method applyPaging
 * @param {Object} params
 * @param {Object} options
 **/
exports.applyPaging = function Twilio_core_REST_applyPaging(params, options) {
	[
		/* 
		How many resources to return in each list page. The default is 50, and the maximum is 1000.
		*/
		'PageSize',

		/* 
		Which page to view. Zero-indexed, so the first page is 0. The default is 0.
		*/
		'Page'

	].forEach(function Twilio_core_REST_applyPaging_forEach(optionName) {

		if (options.hasOwnProperty(optionName)) {
			params[optionName] = options[optionName];
		}

	});
};
