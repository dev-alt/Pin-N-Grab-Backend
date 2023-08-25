const app = require('../src/app'); // Import the app instance
const request = require('supertest'); // Import supertest for testing

describe('User Routes', () => {
    // Test the new test route
    it('should return a message from the test route', async () => {
        const response = await request(app).get('/users/test-route');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('This is a test route');
    });
});