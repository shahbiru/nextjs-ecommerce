const bcrypt = require('bcrypt');
const { signup } = require('../controllers/authController'); 
const User = require("../models/signup")

test('signup function should create a new user', async () => {
    // Mock the necessary objects and data
    const req = {
      body: {
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
  
    // Mock the necessary database operations
    const findOneMock = jest.fn().mockReturnValue(null);
    const createMock = jest.fn().mockResolvedValue({
      _id: 'user_id',
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'hashed_password',
    });
    User.findOne = findOneMock;
    User.create = createMock;
    bcrypt.hash = jest.fn().mockResolvedValue('hashed_password');
  
    // Call the function being tested
    await signup(req, res, next);
  
    // Assertions
    expect(findOneMock).toHaveBeenCalledTimes(2);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'hashed_password',
    });
    // expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: {
        _id: 'user_id',
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        password: 'hashed_password',
      },
    });
    expect(next).not.toHaveBeenCalled();
  });
  