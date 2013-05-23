/**
 * @module wakanda-twilio/lib/base64
 *
 * Base64 encode / decode
 * Forked from http://www.webtoolkit.info/
 **/

var
	KEY_STR,
	Base64,
	fromCharCode;


/**
 * @private
 * @method utf8_encode
 * @param {string} text
 * @return {string}
 **/
function utf8_encode(text) {

	var
		utfText,
		charIndex,
		charCode;

	text = text.replace(/\r\n/g, "\n");
	utfText = "";

	for (charIndex = 0; charIndex < text.length; charIndex += 1) {

		charCode = text.charCodeAt(charIndex);

		if (charCode < 128) {

			utfText += fromCharCode(charCode);

		} else if ((charCode > 127) && (charCode < 2048)) {

			utfText += fromCharCode((charCode >> 6) | 192);
			utfText += fromCharCode((charCode & 63) | 128);

		} else {

			utfText += fromCharCode((charCode >> 12) | 224);
			utfText += fromCharCode(((charCode >> 6) & 63) | 128);
			utfText += fromCharCode((charCode & 63) | 128);

		}

	}

	return utfText;
}


/**
 * @private
 * @method utf8_decode
 * @param {string} utfText
 * @return {string}
 **/
function utf8_decode(utfText) {

	var 
		text,
		charIndex,
		charCode1,
		charCode2,
		charCode3;

	text = "";
	charIndex = 0;
	charCode1 = 0;
	charCode2 = 0;
	charCode3 = 0;

	while (charIndex < utfText.length) {

		charCode1 = utfText.charCodeAt(charIndex);

		if (charCode1 < 128) {

			text += fromCharCode(charCode1);
			charIndex += 1;

		} else if((charCode1 > 191) && (charCode1 < 224)) {

			charCode2 = utfText.charCodeAt(charIndex + 1);
			text += fromCharCode(((charCode1 & 31) << 6) | (charCode2 & 63));
			charIndex += 2;

		} else {

			charCode2 = utfText.charCodeAt(charIndex + 1);
			charCode3 = utfText.charCodeAt(charIndex + 2);
			text += fromCharCode(((charCode1 & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63));
			charIndex += 3;

		}

	}

	return text;
}


/**
 * @private
 * @property keyStr
 * @type string
 **/
KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


/**
 * @private
 * @property fromCharCode
 * @type Function
 **/
fromCharCode = String.fromCharCode;


/**
 * @private
 * @property Base64
 * @type 'wakanda-twilio/lib/base64'
 **/
Base64 = exports;


/**
 * Public method for Base64 encoding
 *
 * @method encode
 * @param {string} input
 * @return {string}
 **/
Base64.encode = function Base64_encode(input) {

	var
		output,
		charIndex,
		charCode1, 
		charCode2, 
		charCode3, 
		enc1, 
		enc2, 
		enc3, 
		enc4;

	output = "";
	charIndex = 0;

	input = utf8_encode(input);

	while (charIndex < input.length) {

		charCode1 = input.charCodeAt(charIndex++);
		charCode2 = input.charCodeAt(charIndex++);
		charCode3 = input.charCodeAt(charIndex++);

		enc1 = charCode1 >> 2;
		enc2 = ((charCode1 & 3) << 4) | (charCode2 >> 4);

		if (isNaN(charCode2)) {
			enc3 = 64;
			enc4 = 64;
		} else {
			enc3 = ((charCode2 & 15) << 2) | (charCode3 >> 6);
			enc4 = isNaN(charCode3) ? 64 : (charCode3 & 63);
		}

		output += KEY_STR.charAt(enc1) + KEY_STR.charAt(enc2) + KEY_STR.charAt(enc3) + KEY_STR.charAt(enc4);

	}

	return output;
};
 

/**
 * Public method for Base64 decoding
 *
 * @method decode
 * @param {string} input
 * @return {string}
 **/
Base64.decode = function Base64_decode(input) {
	var
		output,
		charIndex,
		charCode1, 
		charCode2, 
		charCode3, 
		enc1, 
		enc2, 
		enc3, 
		enc4;

	output = "";
	charIndex = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (charIndex < input.length) {

		enc1 = KEY_STR.indexOf(input.charAt(charIndex++));
		enc2 = KEY_STR.indexOf(input.charAt(charIndex++));
		enc3 = KEY_STR.indexOf(input.charAt(charIndex++));
		enc4 = KEY_STR.indexOf(input.charAt(charIndex++));

		charCode1 = (enc1 << 2) | (enc2 >> 4);
		output += fromCharCode(charCode1);

		if (enc3 !== 64) {
			charCode2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			output += fromCharCode(charCode2);
		}

		if (enc4 !== 64) {
			charCode3 = ((enc3 & 3) << 6) | enc4;
			output += fromCharCode(charCode3);
		}

	}

	output = utf8_decode(output);

	return output;

};


/**
 * Implement Base64 encoding / decoding as standard global btoa() / atob() interface if not natively supported
 *
 * @method implementPolyfil
 **/
Base64.implementPolyfil = function implementPolyfil() {
	if (typeof btoa !== 'function') {
		btoa = Base64.encode;
	}
	if (typeof atob !== 'function') {
		atob = Base64.decode;
	}
};