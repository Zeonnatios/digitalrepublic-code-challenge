/* eslint-disable no-undef */
require('dotenv').config();
const shell = require('shelljs');
const request = require('supertest');
const { app } = require('../server');

describe('GET user/register', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  describe('Quando há campos faltando no body da requisição', () => {
    describe('Campo name', () => {
      it('Ao não ter o campo name', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"name" is required' });
      });

      it('Se o campo name for passado mas estiver vazio', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: '' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"name" is not allowed to be empty' });
      });

      it('Se o campo name não for do tipo string', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 123 });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"name" must be a string' });
      });
    });

    describe('Campo cpf', () => {
      it('Ao não ter o campo cpf', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"cpf" is required' });
      });

      it('Se o campo cpf for passado mas estiver vazio', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"cpf" is not allowed to be empty' });
      });

      it('Se o campo cpf não for do tipo string', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: 12345678910 });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"cpf" must be a string' });
      });

      it('Se o campo cpf tiver menos que 11 caracteres', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '1234567890' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"cpf" length must be at least 11 characters long' });
      });

      it('Se o campo cpf tiver mais que 11 caracteres', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '1234567891011' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"cpf" length must be less than or equal to 11 characters long' });
      });
    });

    describe('Campo email', () => {
      it('Ao não ter o campo email', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" is required' });
      });

      it('Se o campo email for passado mas estiver vazio', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: '' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" is not allowed to be empty' });
      });

      it('Se o campo email não for do tipo string', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: 123 });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" must be a string' });
      });

      it('Se o campo email não for um email válido', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: 'zeonemail.com' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"email" must be a valid email' });
      });
    });

    describe('Campo password', () => {
      it('Ao não ter o campo password', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: 'zeon@email.com' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" is required' });
      });

      it('Se o campo password for passado mas estiver vazio', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: 'zeon@email.com', password: '' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" is not allowed to be empty' });
      });

      it('Se o campo password não for do tipo string', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: 'zeon@email.com', password: 12345678 });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" must be a string' });
      });

      it('Se o campo password tiver menos que 8 caracteres', async () => {
        const res = await request(app)
          .post('/user/register')
          .send({ name: 'Zeon', cpf: '12345678910', email: 'zeon@email.com', password: '1234567' });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: '"password" length must be at least 8 characters long' });
      });
    });
  });

  describe('Ao se registrar passando os campos corretamente', () => {
    it('Deve retornar um token', async () => {
      const res = await request(app)
        .post('/user/register')
        .send({
          name: 'Zeon',
          cpf: '12345678910',
          email: 'zeon@email.com',
          password: '12345678',
        });

      expect(res.status).toBe(201);
      expect(res.body.token).not.toBeNull();
    });
  });
});
