const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const userPayload = { email: 'userprep@email.com', password: 'userPrepPassword2', access: 'preparation' }; 

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

it('should NOT access protected route', async () => { //this user does not access to this endpoint
  const res = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toBe(403);
});

it('should return all items', async () => { //this user has access to this endpoint
  const res = await request(app)
    .get('/api/orders/')
    .set('Authorization', `Bearer ${token}`);

  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toBe(true);
});

