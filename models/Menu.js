const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: [{ type: String, required: true }],
  items: [{type: String, required: true}],
  options: [{type: String, required: false}],
});

module.exports = mongoose.model('Menu', menuSchema);