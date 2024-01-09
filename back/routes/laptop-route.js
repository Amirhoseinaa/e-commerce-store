const express = require('express');
const laptopController = require('../controllers/laptop-controller');

const router = express.Router();

// TODO:
// router
// 	//
// 	.route('/top-5-cheap')
// 	.get(
// 		// GET /top-5-cheap
// 		laptopController.aliasTopLaptops,
// 		laptopController.getAllLaptop
// 	);

// TODO:
// router
// 	//
// 	.route('/laptop-stats')
// 	.get(
// 		// GET /laptop-stats
// 		laptopController.getLaptopsStats
// 	);

router
	.route('/')
	.get(
		// GET /laptop
		laptopController.getAllLaptop
	)
	.post(
		// POST /laptop
		laptopController.createLaptop
	);

router
	.route('/:id')
	.get(
		// GET /laptop/1
		laptopController.getLaptop
	)
	.patch(
		// PATCH /laptop/1
		laptopController.updateLaptop
	)
	.delete(
		// DELETE /laptop/1
		laptopController.deleteLaptop
	);

module.exports = router;
