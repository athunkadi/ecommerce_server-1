const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const request = require('supertest');
const app = require('../app');

afterAll((done) => {
  queryInterface.bulkDelete('Products')
    .then(() => {
      done()
    })
    .catch(err => {
      done()
    })
})

let token;
let tokenCustomer;

beforeAll((done) => {
  request(app)
    .post('/login')
    .send({
      email: 'admin@mail.com',
      password: '1234'
    })
    .then(response => {
      const { body, status } = response;
      token = body.access_token;
      return request(app)
      .post('/login')
      .send({
        email: 'customer@mail.com',
        password: '1234'
      })
    })
    .then(response => {
      const { body } = response;
      tokenCustomer = body.access_token
      done()
    })
  
})

let idProduct ;

describe('Test Endpoint POST /product', () => {

  //sukses create
  it('test create Success', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      idProduct = body.id;

      expect(status).toEqual(201);
      expect(body).toHaveProperty('id', expect.any(Number));
      expect(body).toHaveProperty('name', 'Sepatu');
      expect(body).toHaveProperty('image_url', 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4');
      expect(body).toHaveProperty('price', 1000000);
      expect(body).toHaveProperty('stock', 10);
      done();
    })
  })

  // gagal tidak ada access_token
  it('test create failed not access_token', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: ''
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Authentication Failed');
      done();
    })
  })

  // gagal ada access_token bukan punya admin
  it('test create failed not access_token', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: tokenCustomer
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Not Authorized');
      done();
    })
  })

  // gagal filed required tidak diisi
  it('test create failed Empty field', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: token
    })
    .send({
      name: "",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation notEmpty on name failed');
      done();
    })
  })

  // gagal filed required stock minus
  it('test create failed stock minus', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: -10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation min on stock failed');
      done();
    })
  })

  // gagal filed required price minus
  it('test create failed price minus', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: -1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation min on price failed');
      done();
    })
  })

  // gagal filed required price minus
  it('test create failed price/ stcok input string', (done) => {
    request(app)
    .post('/product')
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: "-1000000",
      stock: "10"
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation min on price failed');
      done();
    })
  })

})

describe('Test Endpoint PUT /product/:id', () => {
  //sukses update
  it('test update Success', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu Kaca",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 9999999,
      stock: 99
    })
    .then(response => {
      const { body, status } = response;
      
      expect(status).toEqual(200);
      expect(body[0]).toHaveProperty('id', expect.any(Number));
      expect(body[0]).toHaveProperty('name', 'Sepatu Kaca');
      expect(body[0]).toHaveProperty('image_url', 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4');
      expect(body[0]).toHaveProperty('price', 9999999);
      expect(body[0]).toHaveProperty('stock', 99);
      done();
    })
  })

  // gagal tidak ada access_token
  it('test update failed not access_token', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: ''
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Authentication Failed');
      done();
    })
  })

  // gagal ada access_token bukan punya admin
  it('test update failed access_token', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: tokenCustomer
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Not Authorized');
      done();
    })
  })

  // gagal filed required tidak diisi
  it('test update failed Empty field', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: token
    })
    .send({
      name: "",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation notEmpty on name failed');
      done();
    })
  })

  // gagal filed required stock minus
  it('test update failed stock minus', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: -10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation min on stock failed');
      done();
    })
  })

  // gagal filed required price minus
  it('test update failed price minus', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: -1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation min on price failed');
      done();
    })
  })

  // gagal filed required price minus
  it('test update failed price/ stcok input string', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: "-1000000",
      stock: "10"
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Validation min on price failed');
      done();
    })
  })

})

describe('Test Endpoint DELETE //product/:id', () => {
  //test sukses
  it('test delete Success', (done) => {
    request(app)
    .delete(`/product/${idProduct}`)
    .set({
      access_token: token
    })
    .send({
      name: "Sepatu Kaca",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 9999999,
      stock: 99
    })
    .then(response => {
      const { body, status } = response;

      console.log(body, 'print body')
      
      expect(status).toEqual(200);
      expect(body).toHaveProperty('msg', 'Delete Success');
      done();
    })
  })

  // gagal tidak ada access_token
  it('test update failed not access_token', (done) => {
    request(app)
    .put(`/product/${idProduct}`)
    .set({
      access_token: ''
    })
    .send({
      name: "Sepatu",
      image_url: "https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4",
      price: 1000000,
      stock: 10
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty('msg', 'Authentication Failed');
      done();
    })
  })
})