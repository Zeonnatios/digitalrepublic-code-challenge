/* eslint-disable no-undef */
require('dotenv').config();
const shell = require('shelljs');
const request = require('supertest');
const { app } = require('../server');

const accounts = {
  accounts: [{ id: 1, accountNumber: 11111, amount: '11000.00', userId: 1 },
    { id: 2, accountNumber: 22222, amount: '22000.00', userId: 2 }],
};

const borisAccount = { account: { id: 2, accountNumber: 22222, amount: '22000.00', userId: 2 } };

const borisDeposit = {
  data: { id: 2, accountNumber: 22222, amount: '23000.00', userId: 2 },
  message: 'Deposit operation completed successfully!' };

const borisWithdraw = {
  account: { id: 2, accountNumber: 22222, amount: '21000.00', userId: 2 },
  message: 'Withdraw operation completed successfully!' };

describe('Testando rota /accounts', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Validar não ser possível listar as contas por:', () => {
    it('Header da requisição sem o token (Authorization)', async () => {
      const res = await request(app).get('/accounts');
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
        .get('/accounts')
        .set('Authorization', `${token}F`);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Expired or invalid token!' });
    });
  });

  describe('Quando o banco de dados está populado', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it('Deve retornar todos as contas', async () => {
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

describe('Testando rota /account/deposit', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Validar não ser possível depositar na própria conta por:', () => {
    it('Header da requisição sem o token (Authorization)', async () => {
      const res = await request(app)
        .patch('/account/deposit')
        .send({ amount: 1000 });
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
        .patch('/account/deposit')
        .send({ amount: 1000 })
        .set('Authorization', `${token}F`);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Expired or invalid token!' });
    });
  });

  describe('Não depositar por não ter campos correto no corpo da requisição:', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it('Sem o campo amount', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;
      const res = await request(app)
        .patch('/account/deposit')
        .set('Authorization', token);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: '"amount" is required' });
    });

    it('Com valor do campo amount igual a 0 ou negativo', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;
      const res = await request(app)
        .patch('/account/deposit')
        .send({ amount: -100 })
        .set('Authorization', token);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: '"amount" must be greater than or equal to 1' });
    });
  });

  describe('Será validado o sucesso a operação de depósito', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });
    it('Deve retornar os dados de sua conta e uma mensagem de sucesso', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;

      const res = await request(app)
        .patch('/account/deposit')
        .send({ amount: 1000 })
        .set('Authorization', token);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(borisDeposit);
    });
  });
});

describe('Testando rota /account/withdraw', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Validar não ser possível sacar na própria conta por:', () => {
    it('Header da requisição sem o token (Authorization)', async () => {
      const res = await request(app)
        .patch('/account/withdraw')
        .send({ amount: 1000 });
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
        .patch('/account/withdraw')
        .send({ amount: 1000 })
        .set('Authorization', `${token}F`);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Expired or invalid token!' });
    });
  });

  describe('Não depositar por não ter campos correto no corpo da requisição:', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it('Sem o campo amount', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;
      const res = await request(app)
        .patch('/account/withdraw')
        .set('Authorization', token);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: '"amount" is required' });
    });

    it('Com valor do campo amount igual a 0 ou negativo', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;
      const res = await request(app)
        .patch('/account/withdraw')
        .send({ amount: -100 })
        .set('Authorization', token);
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: '"amount" must be greater than or equal to 1' });
    });
  });

  describe('Será validado o sucesso a operação de saque', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });

    it('Deve retornar os dados de sua conta e uma mensagem de erro ao não ter fundos o suficiente', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;

      const res = await request(app)
        .patch('/account/withdraw')
        .send({ amount: 100000 })
        .set('Authorization', token);
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ message: 'Your amount can not be negative!' });
    });

    it('Deve retornar os dados de sua conta e uma mensagem de sucesso', async () => {
      const login = await request(app)
        .post('/login')
        .send({ email: 'boriswilliams@email.com', password: '12345678' });
      expect(login.body.token).not.toBeNull();
      const { body: { token } } = login;

      const res = await request(app)
        .patch('/account/withdraw')
        .send({ amount: 1000 })
        .set('Authorization', token);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(borisWithdraw);
    });
  });
});
