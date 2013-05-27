#Wakanda-Twilio Test Suites#

##About##

Those test suites are using the CommonJS 'test' and 'assert' modules
It use the Mockup data from the 'twilio-python' resource test folder*

##How to use##

Not all tests are ready yet but this is how they are meant to be used

###From Wakanda Studio###

execute wakanda-twilio/test/twilioTest.js

If no exception is thrown, congrats, all tests succeded

###From any SSJS script###

excute this code:

```javascript

twilioTestSuite = require('wakanda-twilio/test/index');

credentials = require('credentials-nogit').twilio;

twilioTestSuite.init(credentials.accountSid, credentials.authToken);

twilioTestSuite.run();

console.info('test suite succeded');
```

*https://github.com/twilio/twilio-python/tree/master/tests/resources