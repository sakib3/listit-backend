var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Company Schema
var companySchema = Schema({
  name:String,
  email:String,
  phone:Number,
  address:String,
  password:String,
  confirmed:{ type: Boolean, default: true },
  employees:[{ type: Schema.Types.ObjectId, ref: 'employee' }],
  workplaces:[
                {
                    w_id:{ type: Schema.Types.ObjectId, index: true },
                    name:String,
                    address:String,
                    city_name:String,
                    post_code:Number
                }
  ]
});

var Company = module.exports = mongoose.model('Company', companySchema, 'company');
module.exports.getCompanies = function(callback, limit){
      Company.find(callback).limit(limit);
}
