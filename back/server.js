const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
	console.log('❌', err.name);
	console.log('➝', err.message);
	console.log('➝ Uncaught Exception! 👋🏻Shouting down... ');
	process.exit(1);
});

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
	// .connect(process.env.DATABASE_LOCAL)
	.connect(DB)
	.then(() => console.log('DB connection successful!'));
// .catch((err) => console.log('ERROR'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
	console.log('❌', err.name);
	console.log('➝', err.message);
	console.log('➝ Unhandled Rejection! 👋🏻Shouting down... ');
	server.close(() => process.exit(1));
});
