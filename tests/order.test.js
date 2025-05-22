
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const userPayload = { email: 'userreception@email.com', password: 'userReceptionPassword3', access: 'reception' }; 

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/users/login')
    .send(userPayload);

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Orders API', () => {
  
  it('should create a new order', async () => {
    const now = new Date().toISOString();
    const listMenus = [
      {menuId: '67f8cc88ddcdb283053f609f', quantity: 2},
      {menuId: '682c7fffa7e6f427faf2b7ec', quantity: 1}
    ];

    const lisItems = [{itemId: '67f8cc41ddcdb283053f609c', quantity: 3}];

    const newOrder = {
      status: 'new',
      creationDate: now,
      items: lisItems,
      menus: listMenus
    };

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(newOrder);

    console.log(res.error);
    expect(res.statusCode).toBe(201);
  });
});
