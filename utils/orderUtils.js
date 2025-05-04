const Item = require('../models/Item');
const Menu = require('../models/Menu');

async function calculateOrderTotal(order) {
  let total = 0;

  if (order.items && Array.isArray(order.items) && order.items.length > 0) {
    
    const itemIds = order.items.map(item => item.itemId);
    const itemsFromDB = await Item.find({ _id: { $in: itemIds } });
    const itemMap = new Map();
    itemsFromDB.forEach(dbItem => {
      itemMap.set(dbItem._id.toString(), dbItem.price);
    });

    for (const orderItem of order.items) {
      const price = itemMap.get(orderItem.itemId);
      const quantity = orderItem.quantity || 1;
  
      if (price !== undefined) {
        total += price * quantity;
      } else {
        console.warn(`Item with ID ${orderItem.itemId} not found in DB`);
      }
    }
  }

  if (order.menus && Array.isArray(order.menus) && order.menus.length > 0) {
  
    const menuIds = order.menus.map(menu => menu.menuId);
    const menusFromDB = await Menu.find({ _id: { $in: menuIds } });
    const menuMap = new Map();
    menusFromDB.forEach(dbMenu => {
      menuMap.set(dbMenu._id.toString(), dbMenu.price);
    });
  
    for (const orderMenu of order.menus) {
        const price = menuMap.get(orderMenu.menuId);
        const quantity = orderMenu.quantity || 1;
    
        if (price !== undefined) {
          total += price * quantity;
        } else {
          console.warn(`Menu with ID ${orderMenu.menuId} not found in DB`);
        }
      }
   }

    return total;
  }

  module.exports = { calculateOrderTotal };