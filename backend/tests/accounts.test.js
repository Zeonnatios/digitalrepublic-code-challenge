/* eslint-disable no-undef */
require('dotenv').config();
const shell = require('shelljs');
const request = require('supertest');
const { app } = require('../server');

const borisAccount = { account: { id: 2, accountNumber: 22222, amount: '22000.00', userId: 2 } };

describe('Testando rota /account', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Validar não ser possível consultar a própria conta de banco por:', () => {
    it('Header da requisição sem o token (Authorization)', async () => {
      const res = await request(app).get('/account');
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Token not found!' });
    });

    it('Token invalido ou expirado', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;
      const res = await request(app)
        .get('/account')
        .set('Authorization', `${token}F`);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Expired or invalid token!' });
    });
  });

  describe('Será validado o sucesso da consulta quando passar o token corretamente', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it('Deve retornar os dados de sua conta', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;

      const res = await request(app)
        .get('/account')
        .set('Authorization', token);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(borisAccount);
    });
  });
});
