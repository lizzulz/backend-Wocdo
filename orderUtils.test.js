
const { calculateOrderTotal } = require('./utils/orderUtils');
const Item = require('./models/Item');
const Menu = require('./models/Menu');


// Auto-mock 
jest.mock('./models/Item');
jest.mock('./models/Menu');


describe('calculateOrderTotal', () => {
  it('should correctly calculate total price based on mocked DB items', async () => {
    const order = {
      items: [
        { itemId: '1', quantity: 2 },
        { itemId: '2', quantity: 3 }
      ],
      menus: [
        { menuId: '11', quantity: 3 },
        { menuId: '22', quantity: 1 }
      ]
    };

    // Mock the DB response
    Item.find.mockResolvedValue([
      { _id: '1', price: 10 },
      { _id: '2', price: 5 }
    ]);

    Menu.find.mockResolvedValue([
        { _id: '11', price: 15 },
        { _id: '22', price: 25 }
      ]);
  
  
    const total = await calculateOrderTotal(order);
    expect(total).toBe((2 * 10) + (3 * 5) + (3 * 15)+ (25)); // 105
  });

  it('should handle missing item in DB as expected', async () => {
    const order = {
      items: [
        { itemId: '1', quantity: 1 },
        { itemId: '3', quantity: 2 }
      ]
    };

    Item.find.mockResolvedValue([
      { _id: '1', price: 20 }
      // itemId 3 not returned
    ]);

    const total = await calculateOrderTotal(order);
    expect(total).toBe(20); // only item 1 contributes
  });
});
