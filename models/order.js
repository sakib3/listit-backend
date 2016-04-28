var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Employee Schema
var orderSchema = Schema({

	company: { type: Schema.Types.ObjectId, ref: 'company' },
	employee: { type: Schema.Types.ObjectId, ref: 'employee' },
	products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
	order_date: { type: Date, default: Date.now },
    delivery_date: Date,
    status: { type: Boolean, default: false,index: true }


});

var Order = module.exports = mongoose.model('Order', orderSchema, 'order');

//get Orders
module.exports.getOrders = function(callback, limit){
	Order.find(callback).limit(limit);
}