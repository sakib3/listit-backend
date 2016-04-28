var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Employee Schema
var productSchema = Schema({
	name:String,
    family:String
});

var Product = module.exports = mongoose.model('Product', productSchema, 'product');

//get Products
module.exports.getProducts = function(callback, limit){
	Product.find(callback).limit(limit);
}