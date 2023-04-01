// Require the framework and instantiate it
require('dotenv').config({ path: './variable.env' });
const fastify = require('fastify')({ logger: true });
const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');
const fastifyResponseValidation = require('@fastify/response-validation');
const multer = require('fastify-multer');
const router = require('./routes/index');

fastify.register(fastifyCookie);
fastify.register(fastifySession, { secret: process.env.SECRET_KEY });
fastify.register(fastifyResponseValidation);
fastify.register(multer.contentParser);

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
