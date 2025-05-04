const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  status: { type: String, required: true },
  creationDate: { type: Date, required: true },
  items: [{
    itemId: {type: String, required: true},
    quantity: {type: Number, required: true, default: 1}
  }],
  menus: [{
    menuId: {type: String, required: true},
    quantity: {type: Number, required: true, default: 1}  
  }],
});

module.exports = mongoose.model('Order', orderSchema);