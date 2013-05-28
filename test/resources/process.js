// EXPERIMENTAL
// raw conversion of process.py from twilio-python

var
	SID;

SID = 'ed59a5733d2c1c1c69a83a28';

function twilio_clean(contents) {
    contents = contents.replace(/([A-Z]{2}\w{8})\w{24}/g, SID);
    contents = contents.replace(/\"[a-z0-9]{32}\"/g, '"AUTHTOKEN"');
    contents = contents.replace(/\+\d{10}/g, '+14158675309');
    contents = contents.replace(/[0-9\- \(\)]{14}/g, '(415) 867-5309');
    return contents;
}

exports.run = function test_process_run() {
	var
		folder;

	folder = new File(module.id + '.js').parent;
	folder.forEachFile(function parseFile(file) {
		var
			contents;

		if (file.ext === '.json') {
			contents = loadText(file);
			contents = twilio_clean(contents);
			contents = contents.trim();
			contents += '\n';
			saveText(file.path, contents);
		}
	});
};