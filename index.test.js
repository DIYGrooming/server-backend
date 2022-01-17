import supertest from 'supertest';
import index from './index';

describe('POST /user', () => {
  describe('given an email and password', () => {
    test('should respond with a json object 200 status code with dummy data', async () => {
      const response = await request(app).post('/user/signin').send({
        email: 'ryan@gmail.com',
        password: '123123',
      });

      expect(response.statusCode).toBe(200);
    });

    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/user/signin').send({
        email: 'joe@gmail.com',
        password: 'password',
      });

      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });

    test('response has token', async () => {
      const response = await request(app).post('/users').send({
        username: 'username',
        password: 'password',
      });
      expect(response.body.token).toBeDefined();
    });
  });

  describe('when the email and password is missing', () => {
    test('should respond with a status code of 400', async () => {
      const bodyData = [{ email: 'username' }, { password: 'password' }, {}];
      for (const body of bodyData) {
        const response = await request(app).post('/user/signin').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
