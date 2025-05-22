
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const userPayload = { email: 'useradmin@wocdo.com', password: 'userAdminPassword1', access: 'admin' }; 

let token;
let createdItemId;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/users/login')
    .send(userPayload);

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Menu API', () => {

  it('should return all menus', async () => {
    const res = await request(app)
    .get('/api/menus/')
    .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new menu', async () => {
    const newMenu = {
      name: 'Test Menu',
      description: 'Menu for testing',
      price: 18,
      imageUrls: ['http://example.com/img.jpg'],
      items: ['67ed3eb1615f59fb47722807','67f8cc41ddcdb283053f609c', '67f91aba0f9eca04cb50a118']
    };

    const res = await request(app)
    .post('/api/menus')
    .set('Authorization', `Bearer ${token}`)
    .send(newMenu);

    expect(res.statusCode).toBe(201);
    expect(res.body.menu).toHaveProperty('_id');
    createdItemId = res.body.menu._id; 
    console.log(createdItemId);
  });
 

  it('should delete one menu', async () => {
    const res = await request(app)
    .delete(`/api/menus/${createdItemId}`)
    .set('Authorization', `Bearer ${token}`);
    console.log(res.error);
    expect(res.statusCode).toEqual(204);
    
  });
});
