﻿/** * EXPERIMENTAL * * @module Twillio/core/TwiML * @author alexandre.morgaut@gmail.com **/var	TWIML_BASE,	TAG_TYPE,	TAG_TYPE_IDCHAR,	twimlService,	twimlServiceURL;/** * @class TwilioScript * @constructor **/function TwilioScript() {		/**	 * @property actions	 * @type Array	 **/	this.actions = [];		/**	 * @property inGather	 * @type boolean	 **/	this.inGather = false;}twimlService = require('./service');twimlServiceURL = twimlService.URL;TWIML_BASE = {	open: '<?xml version="1.0" encoding="UTF-8"?>' + '\n' + '<Response>',	close: '</Response>'};TAG_TYPE = {	OPEN: 0,	CLOSE: 1,	PROCESS: 2};TAG_TYPE_IDCHAR = {	'/': 1,	'?': 2};/** * @method say * @param {string} text * @param {Object} [options] voice (man or woman), language (en, en-gb, es, fr, de, it), loop (default: 1) * @returns {TwilioScript} * @doc http://www.twilio.com/docs/api/twiml/say **/TwilioScript.prototype.say = function Twillio_Call_TwilioScript_say(text, options) {	var		sayAction;	sayAction = {		type: 'Say',		options: options || {},		content: text	};	this.actions.push(sayAction);	return this;};/** * @method play * @param {string} audioURI can be mp3, wave, aiff, gsm, or ulaw * @param {number} [loop] (default: 1) * @returns {TwilioScript} * @doc http://www.twilio.com/docs/api/twiml/play **/TwilioScript.prototype.play = function Twillio_Call_TwilioScript_play(audioURI, loop) {	var		playAction;	playAction = {		type: 'Play',		options: loop ? {loop: loop} : {},		content: audioURI	};	this.actions.push(playAction);	return this;};/** * @method pause * @param {number} length * @returns {TwilioScript} * @doc http://www.twilio.com/docs/api/twiml/pause **/TwilioScript.prototype.pause = function Twillio_Call_TwilioScript_pause(length) {	var		pauseAction;	pauseAction = {		type: 'Pause',		options: length ? {length: length} : {}	};	this.actions.push(pauseAction);	return this;};/** * @experimental * @todo manage moduleCallback * * @method gather * @param {Object} options * @returns {TwilioScript} * @doc http://www.twilio.com/docs/api/twiml/gather **/TwilioScript.prototype.gather = function Twillio_Call_TwilioScript_gather(moduleCallback, options) {	var		gatherAction;	this.inGather = true;	gatherAction = {		type: 'Gather',		options: options || {}	};	this.actions.push(gatherAction);	return this;};/** * @method endGather * @returns {TwilioScript} * @doc http://www.twilio.com/docs/api/twiml/gather **/TwilioScript.prototype.endGather = function Twillio_Call_TwilioScript_endGather() {	var		endGatherAction;	this.inGather = false;	endGatherAction = {		type: 'EndGather',		options: {}	};	this.actions.push(endGatherAction);	return this;};/** * @method sendSMS * @param {string} text * @param {Object} [options] to, from, action (URL), method, statusCallback (URL) * @returns {TwilioScript|boolean} * @doc http://www.twilio.com/docs/api/twiml/sms **/TwilioScript.prototype.sendSMS = function Twillio_Call_TwilioScript_sendSMS(text, options) {	var		sendSmsAction;	if (this.inGather) {		return false;	}	sendSmsAction = {		type: 'Sms',		options: options || {},		content: text	};	this.actions.push(sendSmsAction);	return this;};/** * @method dial * @param {string} to * @param {Object} [options] to, from, action (URL), method, statusCallback (URL) * @returns {TwilioScript|boolean} * @doc http://www.twilio.com/docs/api/twiml/dial **/TwilioScript.prototype.dial = function Twillio_Call_TwilioScript_dial(to, options) {	var		dialAction;	if (this.inGather) {		return false;	}	dialAction = {		type: 'Dial',		options: options || {},		content: to	};	this.actions.push(dialAction);	return this;};/** * @experimental * @method dialNumber * @param {string} to * @param {Object} [options] to, from, action (URL), method, statusCallback (URL) * @returns {TwilioScript|boolean} * @doc http://www.twilio.com/docs/api/twiml/dial $ @doc http://www.twilio.com/docs/api/twiml/number **/TwilioScript.prototype.dialNumber = function Twillio_Call_TwilioScript_dialNumber(to, options) {	var		dialAction,		numberAction;	if (this.inGather) {		return false;	}	dialAction = {		type: 'Dial',		options: options.callerId ? {callerId: options.callerId} : {}	};	numberAction = {		type: 'Number',		options: options.sendDigits ? {sendDigits: options.sendDigits} : {},		content: to	};	this.actions.push(dialAction);	this.actions.push(numberAction);	this.actions.push({		type: 'EndDial',		options: {}	});	return this;};/** * @experimental * @method dialClient * @param {string} id * @param {Object} [options] to, from, action (URL), method, statusCallback (URL) * @returns {TwilioScript|boolean} * @doc http://www.twilio.com/docs/api/twiml/dial $ @doc http://www.twilio.com/docs/api/twiml/client **/TwilioScript.prototype.dialClient = function Twillio_Call_TwilioScript_dialClient(id, options) {	var		dialAction,		clientAction;	if (this.inGather) {		return false;	}	dialAction = {		type: 'Dial',		options: options.callerId ? {callerId: options.callerId} : {}	};	clientAction = {		type: 'Client',		options: {},		content: id	};	this.actions.push(dialAction);	this.actions.push(clientAction);	this.actions.push({		type: 'EndDial',		options: {}	});	return this;};/** * @experimental * @todo manage moduleCallback * * @method record * @param {string} moduleCallback * @param {Object} [options] timeout, finishOnKey (1234567890*#), maxLength (3600), transcribe (false), playBeep (true) * @returns {TwilioScript|boolean} * @doc http://www.twilio.com/docs/api/twiml/record **/TwilioScript.prototype.record = function Twillio_Call_TwilioScript_record(moduleCallback, options) {	var		recordAction;	if (this.inGather) {		return false;	}	recordAction = {		type: 'Record',		options: options || {}	};	this.actions.push(recordAction);	return this;};/** * @method hangup * @returns {TwilioScript} * @doc http://www.twilio.com/docs/api/twiml/hangup **/TwilioScript.prototype.hangup = function Twillio_Call_TwilioScript_hangup() {	var		hangupAction;	hangupAction = {		type: 'Hangup',		options: {}	};	this.actions.push(hangupAction);	return this;};/** * @method save * @param {string} name * @param {string} script * @returns {TwilioScript|Error} **/TwilioScript.prototype.save = function Twillio_Call_TwilioScript_save(name, script) {	saveText(script, getFolder().path + 'twilioScripts/' + name + '.twiml');	return this;};/** * @method load * @param {string} name path or name * @returns {TwilioScript|Error} **/TwilioScript.prototype.load = function Twillio_Call_TwilioScript_load(name) {	var		actions,		twimlTags,		twiml;	actions = [];	twimlTags = loadText(getFolder().path + 'twilioScripts/' + name).split('<');	twimlTags.forEach(		function parseTag(tag) {			var				tagType,				tagParts,				tagContent,				tagName,				attributes,				action;						tagParts = tag.split('>');			if (tagParts.length > 1) {				tagContent = tagParts.pop();			}			attributes = tagParts[0].split(' ');			tagName = attributes.shift();			tagType = tagName[0];			switch (tagType) {			case '?':				// <?xml?>  tag				break;			case '/':				// closing tag				if (tagName === '/Gather') {					actions.push({						type: 'EndGather',						options: {}					});				}				if (tagName === '/Dial') {					actions.push({						type: 'EndDial',						options: {}					});				}				break;			default:				// opening tag with attributes				attributes.forEach(					function parseAttribute(attribute, index) {						var							keyValue,							value;						keyValue = attribute.split('=');						value = keyValue[1].split('"')[1];						attributes[index] = {};						attributes[index][keyValue[0]] = value;					}				);				actions.push({					type: tagName,					options: attributes,					content: tagContent				});			}		}	);	this.actions = actions;	return this;};/** * @method toString * @returns {string} **/TwilioScript.prototype.toString = function Twillio_Call_TwilioScript_toString() {	var		twiml;	twiml = [TWIML_BASE.open];	this.actions.forEach(		function Twilio_core_TwiML_createURL_forEachAction(action) {			var				attributes;			// Attributes managment			attributes = [];			Object.getOwnPropertyNames(action.options).forEach(				function Twilio_core_TwiML_createURL_forEachAttribute(name) {					// add the action attribute:					// paramName="paramValue"					attributes.push(name + '="' + action.options[name] + '"');				}			);			if (attributes.length > 0) {				attributes = ' ' + attributes.join(' ');			} else {				attributes = '';			}			switch (action.type) {			case 'Gather':			case 'Dial':				twiml.push('<' + action.type + attributes + '>' + (action.content || ''));				if (action.content) {					twiml.push('</' + action.type + '>');				}				break;			case 'EndGather':			case 'EndDial':				twiml.push('</' + action.type.substr(3) + '>');				break;			case 'Hangup':			case 'Record':				twiml.push(					// add a selfclosing action tag:					// <actionName param1="value" param2="value" />					'<' + action.type + attributes + ' />'				);				break;			default:				twiml.push(					// add an action tag with content:					// <actionName param1="value" param2="value">content</actionName>					'<' + action.type + attributes + '>' + action.content + '</' + action.type + '>'				);			}		}	);	twiml.push(TWIML_BASE.close);	twiml = twiml.join('\n');	return twiml;};/** * @method toURI * @param {boolean} persistent * @returns {String} **/TwilioScript.prototype.toURI = function Twillio_Call_TwilioScript_toURI(persistent) {	var		uuid,		twiml,		twilioStore;	if (twimlService.started === false) {		twimlService.start();	}	uuid = generateUUID();	if (persistent) {		this.save(uuid);	} else {		twiml = this.toString();		storage.lock();		twilioStore = storage.twilio;		twilioStore.twilmlList[uuid] = twiml;		storage.twilio = twilioStore;		storage.unlock();	}	return twimlServiceURL + uuid;};exports.TwilioScript = TwilioScript;