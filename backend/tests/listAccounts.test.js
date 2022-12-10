/* eslint-disable no-undef */
require('dotenv').config();
const shell = require('shelljs');
const request = require('supertest');
const { app } = require('../server');

const accounts = {
  accounts: [{ id: 1, accountNumber: 11111, amount: '11000.00', userId: 1 },
    { id: 2, accountNumber: 22222, amount: '22000.00', userId: 2 }],
};

describe('Testando rota /accounts', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Quando o banco de dados está populado', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it.only('Deve retornar todos as contas', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;

      const res = await request(app)
        .get('/accounts')
        .set('Authorization', token);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(accounts);
      expect(res.body.accounts).toHaveLength(2);
    });
  });
});
