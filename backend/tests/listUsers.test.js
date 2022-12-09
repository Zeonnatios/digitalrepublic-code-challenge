/* eslint-disable no-undef */
require('dotenv').config();
const shell = require('shelljs');
const request = require('supertest');
const { app } = require('../server');

const users = {
  users: [
    {
      id: 1,
      name: 'Matheus Antonio',
      cpf: '11122233310',
      email: 'matheusantonio@email.com',
      account: {
        id: 1,
        accountNumber: 11111,
        amount: '11000.00',
        userId: 1,
      },
    },
    {
      id: 2,
      name: 'Boris Williams',
      cpf: '11122233311',
      email: 'boriswilliams@email.com',
      account: {
        id: 2,
        accountNumber: 22222,
        amount: '22000.00',
        userId: 2,
      },
    },
  ] };

describe('GET /users', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Quando o banco de dados está populado', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it('Deve retornar todos os usuários', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(users);
      expect(res.body.users).toHaveLength(2);
    });
  });

  describe('Quando o banco de dados está vazio', () => {
    it('Deve retornar um array vazio: []', async () => {
      const res = await request(app).get('/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ users: [] });
      expect(res.body.users).toHaveLength(0);
    });
  });
});
