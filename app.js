const fastify = require("fastify")({
  logger: true,
});
const prisma = require("./server");
const cors = require("fastify-cors");
const compress = require("fastify-compress");
const homeRoute = require("./routes/index");

const start = async () => {
  try {
    await fastify.register(cors);
    await fastify.register(compress, {
      encodings: ["gzip"],
    });
    await fastify.register(require("fastify-rate-limit"), {
      max: 3,
      timeWindow: "1 minute",
      allowList: ["127.0.0.1"],
    });
    await fastify.register(homeRoute, { prefix: "api/" });
    await await fastify.listen(3000);
  } catch (error) {
    fastify.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
start();
