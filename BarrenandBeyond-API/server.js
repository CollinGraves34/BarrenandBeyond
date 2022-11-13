require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const colors = require('colors');
const logger = require('./logger');

const imageRoutes = require('./routes/imageRoutes');

app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const PORT = process.env.PORT;
app.listen(
	PORT,
	logger.info(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgBlue
	)
);

connectDB();

app.use('/api/barrenandbeyond/', imageRoutes);

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		success: false,
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
