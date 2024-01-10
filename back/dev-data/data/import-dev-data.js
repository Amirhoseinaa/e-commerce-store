const fs = require('node:fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Laptop = require('../../models/laptop-model');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// CONNECT TO DB
mongoose
	//
	.connect(DB)
	.then(() => console.log('DB connection successful!'));

// READ JSON FILE

const laptops = JSON.parse(fs.readFileSync(`${__dirname}/laptop.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		await Laptop.create(laptops);
		console.log('Data successfully loaded!');
	} catch (err) {
		console.log(err.message);
	}
	process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await Laptop.deleteMany();
		console.log('Data successfully deleted!');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}

console.log(process.argv);
