/**
 * @module Twillio/core/REST
 * @author alexandre.morgaut@gmail.com
 **/

var
	BASE_URL,
	MOCK_BASE_URL,
	baseURL,
	HateosInterface,
	accountSid,
	authorization,
	application,
	applicationSid;

BASE_URL = 'https://api.twilio.com/2010-04-01/';
MOCK_BASE_URL = (httpServer.ssl.enabled ? 'https://' : 'http://') + httpServer.hostName + ':' + httpServer.port + '/mock-twilio-service/';

baseURL = BASE_URL;
HateosInterface = require('wakanda-twilio/core/hateos').HateosInterface;

require('wakanda-twilio/lib/base64').implementPolyfil();




/**
 * @method setTestMode
 * @param {boolean} on
 **/
exports.setTestMode = function setTestMode(on) {
	var
		handlerPath;

	handlerPath = new File(module.id + '.js').parent.path + 'mock-twilio-httpRequestHandler.js';
	if (on) {
		baseURL = MOCK_BASE_URL;
		addHttpRequestHandler('^mock-twilio-service', handlerPath, 'resquestHandler');
	} else {
		baseURL = BASE_URL;
		removeHttpRequestHandler('^mock-twilio-service', handlerPath, 'resquestHandler');
	}
};


/**
 * @method configure
 * @param {string} account
 * @param {string} authToken
 * @param {string} [appSid]
 * @return {boolean}
 **/
exports.configure = function Twilio_core_REST_configure(account, authToken, appSid) {
	var
		servicesSettings;

	if (account && authToken) {
		if (!storage.services.twilio) {
			 if (typeof registerService === 'function') {
			 	registerService('Twilio');
			 }
			 storage.lock();
			 servicesSettings = storage.getItem('services');
			 if (!servicesSettings.hasOwnProperty('twilio')) {
			 	 servicesSettings.twilio = {
			         name: 'Twilio'
			 	 };
			 }
			 servicesSettings.twilio.modulePath = 'wakanda-twilio/core/service';
			 storage.setItem('services', servicesSettings);
			 storage.unlock();
		}
		accountSid = account;
		authorization =  'Basic ' + btoa(accountSid + ':' + authToken);
		applicationSid = appSid;
		application = exports.sendRequest('GET', 'Applications/' + appSid);
		return true;
	} else {
		return false;
	}
};


/**
 * @method isConfigured
 * @return {boolean}
 **/
exports.isConfigured = function Twilio_core_REST_isConfigured() {
	return Boolean(accountSid);
};


/**
 * @method setApplication
 * @param {string} appSid
 **/
exports.setApplication = function Twilio_core_REST_setApplication(appSid) {
	var
		application;

	applicationSid = appSid;
	applications = applicationSvc.getList().elements;
    assert.strictEqual(applications instanceof Error, false, 'no error during the get request by name');
    var application;
    applications.some(function (currentApp) {
		if (currentApp.friendlyName === APPLICATION_NAME) {
			application = currentApp;
			return true;
		}
    });
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
