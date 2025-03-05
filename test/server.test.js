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
