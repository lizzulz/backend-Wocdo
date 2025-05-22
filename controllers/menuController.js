
const Menu = require('../models/Menu');

exports.createMenu = (req, res) => {
  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrls: req.body.imageUrls,
    items: req.body.items,
    options: req.body.options,
  });
  menu.save().then(
    () => {
      res.status(201).json({menu});
    }
  ).catch(
    (error) => {
      res.status(400).json(
        {message: "Error when creating new menu",
          error: error});
    }
  );
}

exports.getOneMenu = (req, res) => {
  Menu.findOne({
    _id: req.params.id
  }).then(
    (menu) => {
      res.status(200).json(menu);
    }
  ).catch(
    (error) => {
      res.status(404).json(
        {message: "Error when getting one menu",
          error: error});
    }
  );
}

exports.modifyMenu = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    
    const updateData = { ...req.body }; 
    delete updateData._id;

    const result = await Menu.updateOne(
      { _id: id },  // Find by id
      { $set: updateData },  // Update only the provided fields
      { runValidators: true }
    );
    
    if (!result || result.matchedCount == 0) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.json({ message: "Menu updated successfully", modifiedCount: result.modifiedCount });
  
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating menu", error: error.message });
  }
}

exports.deleteMenu = (req, res) => {
  Menu.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(204).json({
        message: 'Menu deleted successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json(
        {message: "Error when deleting one menu",
          error: error});
    }
  );
}

exports.getAllMenus = (req, res) => {
  Menu.find().then(
    (menus) => {
      res.status(200).json(menus);
    }
  ).catch(
    (error) => {
      res.status(400).json(
        {message: "Error when getting all menus",
          error: error});
    }
  );
}