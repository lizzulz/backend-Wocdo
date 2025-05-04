
const Order = require('../models/Order');

exports.createOrder = (req, res) => {
  const order = new Order({
    status: req.body.status,
    creationDate: req.body.creationDate,
    items: req.body.items,
    menus: req.body.menus,
  });
  order.save().then(
    () => {
      res.status(201).json({order});
    }
  ).catch(
    (error) => {
      res.status(400).json(
        {message: "Error when creating new order",
        error: error});
    }
  );
}

exports.getOneOrder = (req, res) => {
  Order.findOne({
    _id: req.params.id
  }).then(
    (order) => {
      res.status(200).json(order);
    }
  ).catch(
    (error) => {
      res.status(404).json(
        { message: "Error when retrieving one order",
          error: error
        });
    }
  );
}

exports.modifyOrder =  async (req, res) => {
  try {
        const { id } = req.params;
          
        const updateData = { ...req.body }; // Copy request data
        
        // Ensure _id is not included in the update (just in case)
        delete updateData._id;
    
        const result = await Order.updateOne(
            { _id: id },  // Find by id
            { $set: updateData },  // Update only the provided fields
            { runValidators: true }
        );
        
        if (!result || result.matchedCount == 0) {
            return res.status(404).json({ message: "Order not found" });
        }
    
        res.json({ message: "Order updated successfully", modifiedCount: result.modifiedCount });
    
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating order", error: error.message });
      }
}

exports.deleteOrder = (req, res) => {
  Order.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(204).json({
        message: 'Order deleted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json(
      {   message: "Error when deleting one order",
            error: error
      });
    }
  );
}

exports.getAllOrders = (req, res) => {
    Order.find().then(
      (orders) => {
        res.status(200).json(orders);
      }
    ).catch(
      (error) => {
        res.status(400).json(
            { message: "Error when getting all orders",
                error: error
              });
      }
    );
  }

  exports.modifyOrderStatus =  async (req, res) => {
    try {
          const { id, status } = req.params;
                   
          const updateData = { ...req.body }; 
          
          // Ensure _id is not included in the update (just in case)
          delete updateData._id;
      
          const result = await Order.updateOne(
              { _id: id },  // Find by id
              { status: status },  // Update only the provided fields
              { runValidators: true }
          );
          
          if (!result || result.matchedCount == 0) {
              return res.status(404).json({ message: "Order not found" });
          }
      
          res.json({ message: "Order status updated successfully", modifiedCount: result.modifiedCount });
      
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Error updating order status", error: error.message });
        }
  }