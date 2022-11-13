const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		logger.info(`MongoDB connected: ${conn.connection.host}`.bgGreen.bold);
	} catch (error) {
		logger.error(error);
	}
};

module.exports = connectDB;
