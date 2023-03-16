// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');
const fastifyResponseValidation = require('@fastify/response-validation');
const router = require('./routes/index');

fastify.register(fastifyCookie);
fastify.register(fastifySession, { secret: '26pS+a4ClqmHOKyPYVF6Go2RZexJdN3uNteAc+RTxjNZ51DTY2c84rggUrvcjQ+A' });
fastify.register(fastifyResponseValidation);

// error handler

router(fastify);

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
