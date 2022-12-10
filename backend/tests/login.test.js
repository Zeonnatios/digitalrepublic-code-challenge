/* eslint-disable no-undef */
require('dotenv').config();
const shell = require('shelljs');
const request = require('supertest');
const { app } = require('../server');

describe('Testando rota /login/', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Quando há campos faltando no body da requisição', () => {
    describe('Campo email', () => {
      it('Ao não ter o campo email', async () => {
        const res = await request(app)
          .post('/login')
          .send({ });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" is required' });
      });

      it('Se o campo email for passado mas estiver vazio', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: '' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" is not allowed to be empty' });
      });

      it('Se o campo email não for do tipo string', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: 123 });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" must be a string' });
      });

      it('Se o campo email não for um email válido', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: 'zeonemail.com' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" must be a valid email' });
      });
    });

    describe('Campo password', () => {
      it('Ao não ter o campo password', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: 'zeon@email.com' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" is required' });
      });

      it('Se o campo password for passado mas estiver vazio', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: 'zeon@email.com', password: '' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" is not allowed to be empty' });
      });

      it('Se o campo password não for do tipo string', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: 'zeon@email.com', password: 12345678 });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" must be a string' });
      });

      it('Se o campo password tiver menos que 8 caracteres', async () => {
        const res = await request(app)
          .post('/login')
          .send({ email: 'zeon@email.com', password: '1234567' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" length must be at least 8 characters long' });
      });
    });
  });

  describe('Ao logar com um usuário inexistente', () => {
    it('Deve retornar uma mensagem de erro de usuário não encontrado', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'zeon@email.com',
          password: '12345678',
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'User not found!' });
    });
  });

  describe('Ao errar dados de login', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });
    it('Retornar erro ao usar email incorreto', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'matheus@email.com',
          password: '12345678',
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'User not found!' });
    });

    it('Retornar erro ao usar o password incorreto', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'matheusantonio@email.com',
          password: '123456789',
        });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: 'Email or password incorrect!' });
    });
  });

  describe('Logando com os dados corretos', () => {
    beforeEach(() => {
      shell.exec('npx sequelize-cli db:seed:all');
    });
    it('Deve retornar um token', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'matheusantonio@email.com', password: '12345678' });

      expect(res.status).toBe(200);
      expect(res.body.token).not.toBeNull();
    });
  });
});
