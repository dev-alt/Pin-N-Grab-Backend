const app = require('../src/app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

describe('User Routes', () => {
  it('should get a list of users', async () => {
    const res = await request(app).get('/users/data');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get the total number of users', async () => {
    const res = await request(app).get('/users/total-users');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('totalUsers');
  });

  // Add more test cases as needed
});