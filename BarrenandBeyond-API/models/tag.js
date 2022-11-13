const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
	_id: String,
	name: String,
});

module.exports = mongoose.model('Tag', tagSchema);