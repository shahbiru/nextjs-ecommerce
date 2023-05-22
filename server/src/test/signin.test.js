const { signin } = require('../controllers/authController'); // Replace 'yourFile' with the actual file path
const bcrypt = require('bcrypt');

describe('signin function', () => {
  test('should return success and a token when valid credentials are provided', async () => {
    console.log("inside")

    // Mock the necessary objects and data
    const req = {
      body: {
        email: 'birva@gmail.com',
        password: 'birva56409',
      },
    };
    const user = {
      _id: '646b4820f0f077c94caec3a9',
      email: 'birva@gmail.com  ',
      password: await bcrypt.hash('birva56409', 10),
    };
    const res = {
        myMethod: jest.fn().mockReturnThis()
    //   json: jest.fn(),
    };
    console.log(res)

    // Mock the User.findOne function
    const User = {
      findOne: jest.fn().mockResolvedValue(user),
    };
    console.log("User,", User)
    // Mock the jwt.sign function
    const jwt = require('jsonwebtoken');
    const jwtSignMock = jest.spyOn(jwt, 'sign').mockReturnValue('token123');
    console.log(jwtSignMock)

    // Call the function being tested
    await signin(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'birva@gmail.com' }).timeout(20000);
    expect(bcrypt.compare).toHaveBeenCalledWith('birva56409', user.password);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: user,
      message: 'success',
      token: 'token123',
    });
    expect(jwtSignMock).toHaveBeenCalledWith({ id: '646b4820f0f077c94caec3a9' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  test('should return an error message when invalid credentials are provided', async () => {
    // Mock the necessary objects and data
    const req = {
      body: {
        email: 'birva@gmail.com',
        password: 'invalidpassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne function to return null (no user found)
    const User = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    // Call the function being tested
    await signin(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'birva@gmail.com' }).timeout(20000);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  test('should return an error message when the password is incorrect', async () => {
    // Mock the necessary objects and data
    const req = {
      body: {
        email: 'birva@gmail.com',
        password: 'incorrectpassword',
      },
    };
    const user = {
      _id: '646b4820f0f077c94caec3a9',
      email: 'birva@gmail.com  ',
      password: await bcrypt.hash('birva56409', 10),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne function to return a user
    const User = {
      findOne: jest.fn().mockResolvedValue(user),
    };

    // Mock the bcrypt.compare function to return false (incorrect password)
    const bcryptCompareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    // Call the function being tested
    await signin(req, res);
    console.log("res:::",res)
    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'birva@gmail.com' }).timeout(20000);;
    expect(bcrypt.compare).toHaveBeenCalledWith('incorrectpassword', user.password);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' })
})
})
