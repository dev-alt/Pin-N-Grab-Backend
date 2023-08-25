const request = require('supertest');
const app = require('./app'); // Make sure the path to your Express app is correct
const db = require('./utils/db');
const userController = require('./controllers/userController'); // Make sure the path is correct

describe('User Profile Routes', () => {
  // Run before each test
  beforeEach(async () => {
    // Reset the database or perform any setup here if needed
    // For example: await db.sync({ force: true });
  });

  it('should get a user profile', async () => {
    const userId = 2; // Change this to the user ID you want to test
    const response = await request(app).get(`/users/${userId}/profile`);
    
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });

  it('should update a user profile', async () => {
    const userId = 1; // Change this to the user ID you want to test
    const updatedProfile = {
      firstName: 'Updated First Name',
      lastName: 'Updated Last Name',
    };

    const response = await request(app)
      .put(`/users/${userId}/profile`)
      .send(updatedProfile);
    
    expect(response.status).toBe(200);
    // Add more assertions based on your expected response
  });
});
