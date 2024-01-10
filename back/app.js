const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error-controller');
const laptopRouter = require('./routes/laptop-route');

const app = express();
///////////////////// GLOBAL MIDDLEWARES

app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json());

//////////////////// ROUTES

app.use('/api/v1/products/laptop', laptopRouter);

app.all('*', (req, res, next) => {
	const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
	next(err);
});

///////////////////// Global Error Handling
app.use(globalErrorHandler);

///////////////////// START SERVER
module.exports = app;
