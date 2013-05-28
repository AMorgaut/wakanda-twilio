
function Mock() {

	var
		that;

	function mock() {
		return that.return_value;
	}

	if (this && this.constructor === Mock) {
		that = this;
	} else {
		that = mock;
	}

	that.assert_called_with = function() {
	}
}


exports.Mok = Mock;

exports.patch = patch;