// test/server.test.js
const request = require('supertest');
const fastify = require('../server');
const { heavyComputation } = require('../server');

describe('heavyComputation function', () => {
    test('should return a number', () => {
        const result = heavyComputation(1000);
        expect(typeof result).toBe('number');
    });

    test('should return higher value for larger inputs', () => {
        const smallResult = heavyComputation(1000);
        const largeResult = heavyComputation(100000);
        expect(largeResult).toBeGreaterThan(smallResult);
    });
});

describe('API Endpoints', () => {
    beforeAll(async () => {
        await fastify.ready(); // Asegura que el servidor esté listo antes de probar
    });

    afterAll(async () => {
        await fastify.close(); // Cierra el servidor después de las pruebas
    });

    test('GET /fast should return a fast response', async () => {
        const response = await request(fastify.server).get('/fast');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'This is a fast response');
        expect(response.body).toHaveProperty('result');
        expect(typeof response.body.result).toBe('number');
    });

    test('GET /slow should return a slow response', async () => {
        const start = Date.now();
        const response = await request(fastify.server).get('/slow');
        const duration = Date.now() - start;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'This is a slow response');
        expect(response.body).toHaveProperty('result');
        expect(typeof response.body.result).toBe('number');
        expect(duration).toBeGreaterThanOrEqual(5000); // Asegura que tomó al menos 5 segundos
    });
});
