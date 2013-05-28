var
	Mock;

Mock = require('./mock').Mock;

/**
 * @method create_mock_json
 * @param {string} id
 * @return {Mock}
 **/
exports.create_mock_json = create_mock_json(id) {
    var
    	path,
    	mock;
    
    path = File(module.id + '.js').parent.path + 'resource/' + id + '.json';
    mock = new Mock();
    mock.content = loadText(path);
    return mock;
};