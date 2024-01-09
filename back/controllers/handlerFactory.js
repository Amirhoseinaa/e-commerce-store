const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const APIFeatures = require('../utils/api-features');

module.exports.deleteOne = function(Model) {
	return catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) return next(new AppError('هیچ سندی با آن شناسه یافت نشد', 404));

		res.status(204).json({
			status: 'success',
			data: {
				data: null
			}
		});
	});
};

module.exports.createOne = function(Model) {
	return catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);

		res.status(200).json({
			status: 'success',
			data: {
				data: doc
			}
		});
	});
};

module.exports.updateOne = function(Model) {
	return catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		if (!doc) return next(new AppError('هیچ سندی با آن شناسه یافت نشد', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc
			}
		});
	});
};

module.exports.getOne = function(Model, popOptions) {
	return catchAsync(async (req, res, next) => {
		const query = Model.findById(req.params.id);

		// FIXME:
		// if (popOptions) query.populate(popOptions);

		const doc = await query;
		if (!doc) return next(new AppError('هیچ سندی با آن شناسه یافت نشد', 404));

		res.status(200).json({
			status: 'success',
			data: {
				data: doc
			}
		});
	});
};

module.exports.getAll = function(Model) {
	return catchAsync(async (req, res, next) => {
		console.log('Hello');

		// TODO:
		// To allow for nested GET reviews on laptop
		const filterObj = {};
		// if (req.params.laptopId) filterObj = { laptop: req.params.laptopId };

		// BUILD QUERY
		const features = new APIFeatures(Model.find(filterObj), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate();

		// EXECUTE QUERY
		const docs = await features.query;
		// const doc = await features.query.explain();

		// SEND RESPONSE
		res.status(200).json({
			status: 'success',
			results: docs.length,
			data: {
				data: docs
			}
		});
	});
};
