const fastify = require('fastify')({
  logger: true,
});
const prisma = require('./server.js');
const cors = require('fastify-cors');
const compress = require('fastify-compress');

fastify.register(cors);
fastify.register(compress, {
  encodings: ['gzip'],
});
fastify.register(require('fastify-rate-limit'), {
  max: 3,
  timeWindow: '1 minute',
  allowList: ['127.0.0.1'],
});

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (error) {
    fastify.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
start();
