const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);