const factory = require('./handlerFactory');
const Laptop = require('../models/laptop-model');

// TODO:
// exports.aliasTopLaptops = (req, res, next) => {
// 	req.query.limit = '5';
// 	req.query.sort = '-ratingsAverage,price';
// 	req.query.fields = 'name,price,ratingsAverage,summary';
// 	next();
// };

// TODO:
// exports.getLaptopsStats = catchAsync(async (req, res, next) => {
// 	const stats = await Laptop.aggregate([
// 		{
// 			$match: {
// 				ratingsAverage: { $gte: 4.5 }
// 			}
// 		},
// 		{
// 			$group: {
// 				_id: { $toUpper: '$brand' },
// 				numLaptops: { $sum: 1 },
// 				numRatings: { $sum: '$ratingsQuantity' },
// 				avgRating: { $avg: '$ratingsAverage' },
// 				avgPrice: { $avg: '$price' },
// 				minPrice: { $min: '$price' },
// 				maxPrice: { $max: '$price' }
// 			}
// 		},
// 		{
// 			$sort: {
// 				avgPrice: 1
// 			}
// 		}
// 	]);

// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			stats: stats
// 		}
// 	});
// });

exports.getAllLaptop = factory.getAll(Laptop);
exports.getLaptop = factory.getOne(Laptop);
// FIXME:
// exports.getLaptop = factory.getOne(Laptop, { path: 'reviews' });
exports.createLaptop = factory.createOne(Laptop);
exports.updateLaptop = factory.updateOne(Laptop);
exports.deleteLaptop = factory.deleteOne(Laptop);
