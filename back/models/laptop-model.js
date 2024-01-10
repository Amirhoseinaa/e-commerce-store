const mongoose = require('mongoose');
// const slugify = require('slugify');
// const validator = require('validator');

const laptopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'لپ تاب باید نام داشته باشد'],
			unique: true,
			trim: true,
			maxlength: [100, 'نام لپ تاب باید کمتر یا مساوی از 40 کاراکتر باشد'],
			minlength: [10, 'نام لپ تاب باید بیش از 10 کاراکتر داشته باشد']
		},
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'رتبه باید بالاتر از 1.0 باشد'],
			max: [5, 'رتبه باید بالای 5.0 باشد']
		},
		ratingsQuantity: {
			type: Number,
			default: 0
		},
		price: {
			type: Number,
			required: [true, 'لپ تاب باید قیمت داشته باشد']
		},
		description: {
			type: String,
			trim: true
		},
		imageCover: {
			type: String,
			required: [true, 'لپ تاب باید تصویر داشته باشد']
		},
		isAvailable: {
			type: Boolean,
			default: true
		}
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// TODO:
// laptopSchema.index({ price: -1 });
// laptopSchema.index({ ratingsAverage: -1 });
// laptopSchema.index({ name: 1 });

// TODO:
// Virtual populate
// laptopSchema.virtual('reviews', {
// 	ref: 'Review',
// 	foreignField: 'laptop',
// 	localField: '_id'
// });

/////////////////////////// QUERY MIDDLEWARE:

// TODO:
// Hide Secret laptop
// laptopSchema.pre(/^find/, function(next) {
// 	this.find({ secretLaptop: { $ne: true } });
// 	next();
// });

///////////////////////// AGGREGATION MIDDLEWARE:

// Hide Secret Laptop
laptopSchema.pre('aggregate', function(next) {
	this.pipeline().unshift({
		$match: {
			secretTour: {
				$ne: true
			}
		}
	});
	next();
});

module.exports = mongoose.model('Laptop', laptopSchema);
