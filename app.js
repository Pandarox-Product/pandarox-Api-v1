const fastify = require("fastify")({
  logger: true,
});

const prisma = require("./server");
const cors = require("fastify-cors");
const compress = require("fastify-compress");
const route = require("./routes/index");
const multer = require("fastify-multer");
const auth = require("./middleware/auth");

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
    await fastify.register(auth);
    await fastify.register(multer.contentParser);
    await fastify.register(route, { prefix: "api" });

    await fastify.listen(3000);
  } catch (error) {
    fastify.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
start();
