const Item = require('../models/Item');



exports.createItem = (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrls: req.body.imageUrls,
    inStock: req.body.inStock,
  });
  item.save().then(
    () => {
      res.status(201).json({item});
    }
  ).catch(
    (error) => {
      res.status(401).json(
        {message: "Error when creating new item",
         error: error});
    }
  );
}

exports.getOneItem = (req, res) => {
  Item.findOne({
    _id: req.params.id
  }).then(
    (item) => {
      res.status(200).json(item);
    }
  ).catch(
    (error) => {
      res.status(404).json(
        {message: "Error when getting one item",
          error: error});
    }
  );
}

exports.modifyItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    
    const updateData = { ...req.body }; // Copy request data
    
    // Ensure _id is not included in the update (just in case)
    delete updateData._id;

    const result = await Item.updateOne(
      { _id: id },  // Find by id
      { $set: updateData },  // Update only the provided fields
      { runValidators: true }
    );
    
    if (!result || result.matchedCount == 0) {
        return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully", modifiedCount: result.modifiedCount });
    console.log("Matched Count:", result.matchedCount);
    console.log("Modified Count:", result.modifiedCount);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating item", error: error.message });
  }
}

exports.deleteItem = (req, res) => {
  Item.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(204).json({
        message: 'Item deleted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json(
        {message: "Error when deleting one item",
          error: error});
    }
  );
}

exports.getAllItems = (req, res) => {
  Item.find().then(
    (items) => {
      res.status(200).json(items);
    }
  ).catch(
    (error) => {
      res.status(400).json(
        {message: "Error when getting all items",
          error: error});
    }
  );
}