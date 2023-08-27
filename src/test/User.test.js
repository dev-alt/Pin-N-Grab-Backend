const  sequelize = require('../utils/db');
const User = require('../models/User');

describe('User model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new user', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(user.username).toBe('testuser');
    expect(user.email).toBe('testuser@example.com');
    expect(user.password).toBe('password123');
  });

  it('should require a username', async () => {
    await expect(
      User.create({
        email: 'testuser@example.com',
        password: 'password123',
      })
    ).rejects.toThrow();
  });

  it('should require an email', async () => {
    await expect(
      User.create({
        username: 'testuser',
        password: 'password123',
      })
    ).rejects.toThrow();
  });

  it('should require a valid email', async () => {
    await expect(
      User.create({
        username: 'testuser',
        email: 'notanemail',
        password: 'password123',
      })
    ).rejects.toThrow();
  });

  it('should require a password', async () => {
    await expect(
      User.create({
        username: 'testuser',
        email: 'testuser@example.com',
      })
    ).rejects.toThrow();
  });
});