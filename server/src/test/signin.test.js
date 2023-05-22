const request = require('supertest');
const app = require('../App');

describe('API Test Cases', () => {
  let token;
  let userID;
  let productID;
  let price;
  describe('POST /api/signin', () => {
    it('should return a JWT token when providing valid credentials', async () => {
      const response = await request(app)
        .post('/api/signin')
        .send({ email: 'birva@gmail.com', password: 'birva56409' })
      expect(response.body).toHaveProperty('token');
      token = response.body.token;
      userID = response.body.data._id;
    });

    it('should return 404 when providing invalid email', async () => {
      await request(app)
        .post('/api/signin')
        .send({ email: 'birvaa@gmail.com', password: 'birvaa56409' })
        .expect(400);
    });

    it('should return 400 when providing invalid password', async () => {
      await request(app)
        .post('/api/signin')
        .send({ email: 'birvaa@gmail.com', password: 'birvaa56409' })
        .expect(400);
    });
  });
  describe('GET /api/products/', () => {
    it('should return the details of all product', async () => {
      const productResponse = await request(app)
        .get(`/api/product/`)
        .set('Authorization', token)
        .expect(200);
      productID = productResponse.body[0]._id
      price = productResponse.body[0].price
    });
    it('should return 401 when product not found', async () => {
      await request(app)
        .get('/api/product')
        .expect(401);
    });
  });
  describe('POST /api/cart', () => {
    it('should create a new cart', async () => {
      await request(app)
        .post('/api/cart')
        .send({
          "userId": userID,
          "productId": productID,
          "price": price
        })
        .set('Authorization', token)
        .expect(200);
    });
  });
  describe('GET /api/cart/:id', () => {
    it('get cart details of user', async () => {
      await request(app)
        .get(`/api/cart/${userID}`)
        .set('Authorization', token)
        .expect(200);
    });
  });
  describe('PUT /api/cart/:id', () => {
    it('should update the cart', async () => {
      await request(app)
        .put(`/api/cart/${productID}`)
        .send({
          "productId": productID,
          "userId": userID,
          "quantity": 2,
        })
        .set('Authorization', token)
        .expect(200);
    });
  });
  describe('DELETE /api/cart/:id', () => {
    it('should delete the cart', async () => {
      await request(app)
        .delete(`/api/cart/${productID}`)
        .send({
          "userId": userID,
        })
        .set('Authorization', token)
        .expect(200);
    });
  });
});


