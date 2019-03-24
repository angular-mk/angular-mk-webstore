var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  description: String,
  // Path of /public/ProductImages
  thumbnail: String,
  images: [String],
  price: Number,
  quantity: Number
});

module.exports = mongoose.model('Products', productSchema);
