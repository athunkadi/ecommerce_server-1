const request = require('supertest');
const app = require('../app');

describe('Test Endpoint POST /login', () => {
  // sukses
  it('test login Success', (done) => {
    request(app)
    .post('/login')
    .send({
      email: 'customer@mail.com',
      password: '1234'
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(200);
      expect(body).toHaveProperty('access_token', expect.any(String));
      done()
    })
  })

  //gagal email ada, password salah
  it('test login wrong password', (done) => {
    request(app)
    .post('/login')
    .send({
      email: 'admin@mail.com',
      password: '123456'
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty("msg", "wrong email/password")
      done()
    })
  })

  //gagal email tidak ada di db
  it('test login wrong email', (done) => {
    request(app)
    .post('/login')
    .send({
      email: 'adminn@mail.com',
      password: '12345'
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(401);
      expect(body).toHaveProperty("msg", "wrong email/password")
      done()
    })
  })

  // tidak memasukkan email dan password
  it('test login imputan kosong', (done) => {
    request(app)
    .post('/login')
    .send({
      email: '',
      password: ''
    })
    .then(response => {
      const { body, status } = response;

      expect(status).toEqual(404);
      expect(body).toHaveProperty("msg", "email/password not null")
      done()
    })
  })
})