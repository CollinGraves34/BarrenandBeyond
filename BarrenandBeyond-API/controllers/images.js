const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const logger = require('../logger');
const Image = require('../models/image');
const Tag = require('../models/tag');

exports.getAllImages = async () => {
	let val;
	const filter = {};

	await Image.find(filter)
		.exec()
		.then((result) => {
			logger.debug(`GETTING ALL IMAGES`.green);
			val = result;
		})
		.catch((err) => {
			logger.error(`ERROR GETTING IMAGES: ${err}`.red);
			return err;
		});
	return val;
};

exports.getImage = async (id) => {
	let val;
	const filter = {};
	
	await Image.findById(id)
		.exec()
		.then((result) => {
			logger.debug(`GETTING ALL IMAGES`.green);
			val = result;
		})
		.catch((err) => {
			logger.error(`ERROR GETTING IMAGES: ${err}`.red);
			return err;
		});
	return val;
};

exports.getAllTags = async () => {
	let val;
	const filter = {};

	await Tag.find(filter)
		.exec()
		.then((result) => {
			logger.debug(`GETTING ALL TAGS`.green);
			val = result;
		})
		.catch((err) => {
			logger.error(`ERROR GETTING TAGS: ${err}`.red);
			return err;
		});
	return val;
};

exports.updateImage = async (videoId, path, title, mod, desc, func, tags, views) => {
	await Image.findByIdAndUpdate(videoId, {
		path: path,
		title: title,
		module: mod,
		description: desc,
		function: func,
		tags: tags,
		views: views,
	})
		.exec()
		.then((result) => {
			logger.debug(`UPDATING VIDEO ID: ${videoId} TITLE: ${title}`.green);
			return result;
		})
		.catch((err) => {
			logger.error(`ERROR UPDATING VIDEO: ${err}`.red);
			return err;
		});
};

exports.createImage = async (filename, author, image, desc, tags, views) => {
	const vid = new Image ({
		_id: uuidv4(),
		__filename: filename,
		author: author,
		image: image,
		description: desc,
		tags: tags,
		views: views,
	}) 
	await vid.save()
	.then((result) => {
		logger.debug(`CREATING VIDEO ID: ${vid._id} TITLE: ${vid.title}`.green + ` Module: ${vid.module}`.red);
		return result;
	})
	.catch((err) => {
		logger.error(`ERROR CREATING VIDEO: ${err}`.red);
		return err;
	});
};

exports.createTag = async (tag) => {
	const data = new Tag ({
		_id: uuidv4(),
		name: tag,
	}) 
	await data.save()
	.then((result) => {
		logger.debug(`CREATING MODULE ID: ${data._id} TITLE: ${data.name}`.green);
		return result;
	})
	.catch((err) => {
		logger.error(`ERROR CREATING MODULE: ${err}`.red);
		return err;
	});
};

exports.deleteImage = async (imageId) => {
	await Image.findByIdAndDelete(imageId)
		.exec()
		.then(() =>
			logger.debug(`DELETED ROLE ID: ${imageId} TITLE: ${title}`.green)
		)
		.catch((err) => {
			logger.error(`ERROR DELETING IMAGE: ${err}`.red);
			return err;
		});
};
