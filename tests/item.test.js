
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const userPayload = { email: 'useradmin@wocdo.com', password: 'userAdminPassword1', access: 'admin' }; 

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

describe('Item API', () => {
  it('should return all items', async () => {
    const res = await request(app)
    .get('/api/items/')
    .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should NOT create a new item', async () => {
    const newItem = {
      name: 'Test Item',
      price: 'twenty euros',
      description: 'For testing',
      imageUrls: ['http://example.com/img.jpg'],
      inStock: true
    };

    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem);

    expect(res.statusCode).toBe(401);
  });
});
