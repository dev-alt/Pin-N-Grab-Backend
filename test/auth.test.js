const app = require('../src/app'); // Import your Express app
const request = require('supertest');
const { expect } = require('chai');

describe('Authentication Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser2', email: 'test2@example.com', password: 'testpass' });

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal('User registered successfully');
  });
});