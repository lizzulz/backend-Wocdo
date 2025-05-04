const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: [{ type: String, required: true }],
  inStock: { type: Boolean , required: true },
});

module.exports = mongoose.model('Item', itemSchema);