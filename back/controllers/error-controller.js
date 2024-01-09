const AppError = require('../utils/app-error');

function sendErrorDev(err, res) {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

function sendErrorProd(err, res) {
	// trusted error
	if (err.isOperational)
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});
	// Unknown errors
	else {
		// 1. Log error
		console.error('ERROR ❌', err);

		// 2. Send Generic message
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!'
		});
	}
}

function CastErrorDB(err) {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 404);
}

function DuplicateFieldsDB(err) {
	const value = err.keyValue.name;

	const message = `Duplicate field value:${value} لطفا از مقدار دیگری استفاده کنید`;

	return new AppError(message, 404);
}

function ValidationErrorDB(err) {
	const messages = Object.values(err.errors).map((error) => error.message);

	const message = `Invalid input data: ${messages.join('. ')}`;

	return new AppError(message, 404);
}

// TODO:
// function JWTError() {
// 	const error = new AppError('توکن نامعتبر - لطفا یکبار دیگر امتحان کنید', 401);
// 	return error;
// }

// TODO:
// function TokenExpiredError() {
// 	const error = new AppError('تاریخ انقضای توکن شما تمام شده است', 401);
// 	return error;
// }

module.exports = (err, req, res, next) => {
	// console.log(err.name);

	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
	else if (process.env.NODE_ENV === 'production') {
		let error = JSON.parse(JSON.stringify(err));

		// Handling Invalid Database IDs
		if (error.name === 'CastError') error = CastErrorDB(error);

		// Handling Duplicate Database Fields
		if (error.code === 11000) error = DuplicateFieldsDB(error);

		// Handling Mongoose Validation Errors
		if (error.name === 'ValidationError') error = ValidationErrorDB(error);

		// TODO:
		// // Handling JsonWebToken Errors
		// if (error.name === 'JsonWebTokenError') error = JWTError();
		// if (error.name === 'TokenExpiredError') error = TokenExpiredError();

		sendErrorProd(error, res);
	}
};
