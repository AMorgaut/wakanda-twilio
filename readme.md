# Wakanda-Twilio CommonJS module #

This module provides a synchronous SSJS API for Wakanda to use the Twilio services.


## Getting Started ##

```javascript
    var twilio, infos;
    
    twilio = require('wakanda-twilio/index');
    
    twilio.configure(
    	AccountSid, //  Required
    	AuthToken, // Required
    	ApplicationSid // Required for many actions
    );
    
    infos = twilio.account.get(); // get infos about the account
    twilio.sms.send(from, to, message); // send a SMS
```

Note: 
Wakanda doesn't support yet the automatic call to index.js when require() is called on a folder. This feature is out of the scope of CommonJS modules and packages but is widely used in node.js ones. 
As it is really useful, it should be implemented in future versions of Wakanda, meaning that require('wakanda-twilio') will then also work while the above require('wakanda-twilio/index') will remain correct.

## Prerequisite ##

Twilio require you to create an account on their website: https://www.twilio.com/try-twilio

You can start using the API in trial mode, providing an **AccountSid** and a **AuthToken**, but most services will quickly require you to buy some credits and provide a **ApplicationSid**.


## Installation ##

To use the module, copy it in the "modules" folder of your Wakanda application, or of your Wakanda server.



## Currently implemented API ##

* account:
	* getList([options]), 
	* get([id]), 
	* update([options])
	* creatSubAccount([options])
* application:
	* getList([options]), 
	* get(id), 
	* create(friendlyName, [options])
	* update(id, [options])
	* remove(id)
* incomingNumber:
	* getList([options]), 
	* get(id), 
	* create(phoneNumber, areaCode, [options])
	* update(id, [options])
	* remove(id)
* notification: 
	* getList([options])
	* get(id)
	* remove(id)
* transcription: 
	* getList([options])
	* get(id)
* reccording
	* getList([options])
	* get(id)
	* remove(id)
	* getTranscriptionsList(id[, options])
* queue
	* getList([options])
	* get(id)
	* create([options])
	* update(id, [options])
	* remove(id)
	* getMembers([options])
	* getMember(memberId)
	// still miss dequeueing actions
* sms
	* getList([options])
	* get(id)
	* send(from, to, message)
* call
	* getList([options])
	* get(id)
	* make(from, to, [options]) // still need additional TwiML support
	* modifyLiveCall(id, status)

The returned result is currently the raw result extented with paging methods

###TwiML support###

* hangup()
* load(name)
* pause()
* play(audioURI, loop)
* save(name, script)
* say(text, options)
* sendSMS(text, options)
* toString()
* toURI(permanent)



## Tips ##

On any of those services, to check if something goes wrong you can test this way:

```javascript
    if (result instanceof Error) {
    	console.error(resultmessage, result.details);
    }
```

## TODO ##

* Add better Dial & Gather support in TwiML
* Implement the missing services (conference, ...)
* Support more settings like default page size by services

## License (MIT License) ##

Copyright (c) 2012-2013 Alexandre Morgaut

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
