// server.js

// Importa Fastify y crea una instancia del servidor
const Fastify = require('fastify');
const fastify = Fastify();

const port = 3010;

// Función que realiza un cálculo intensivo en CPU
const heavyComputation = (num) => {
    let result = 0;
    for (let i = 0; i < num; i++) {
        result += Math.sqrt(i) * Math.sin(i); // Cálculo arbitrario para consumir CPU
    }
    return result;
};

// Endpoint rápido: Responde inmediatamente con un mensaje JSON
fastify.get('/fast', async (request, reply) => {
    const result = heavyComputation(1000); // Cálculo rápido para prueba
    return { message: 'This is a fast response', result };
});

// Endpoint lento: Simula un proceso pesado con un retraso de 5 segundos y cálculo intensivo
fastify.get('/slow', async (request, reply) => {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de responder
    const result = heavyComputation(10000000); // Cálculo intensivo en CPU
    return { message: 'This is a slow response', result };
});

// Exportar la instancia de Fastify y la función heavyComputation para pruebas
module.exports = { fastify, heavyComputation };

// Función para iniciar el servidor si el archivo es ejecutado directamente
if (require.main === module) {
    const start = async () => {
        try {
            // Inicia el servidor en el puerto 3000 y lo hace accesible en cualquier interfaz de red
            await fastify.listen({ port, host: '0.0.0.0' });
            console.log(`Server running on port ${port}`);
        } catch (err) {
            // Captura errores en caso de que falle el inicio del servidor
            console.error(err);
            process.exit(1); // Finaliza el proceso con código de error
        }
    };

    // Llama a la función para iniciar el servidor
    start();
}
