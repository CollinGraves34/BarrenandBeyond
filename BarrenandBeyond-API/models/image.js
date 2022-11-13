const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
	_id: String,
	__filename: String,
	author: String,
	image: String,
	description: String,
	tags: Array,
	views: Number,
});

module.exports = mongoose.model('Images', ImageSchema);
