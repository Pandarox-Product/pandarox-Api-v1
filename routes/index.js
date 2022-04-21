const homeRoute = require("./home/index");
const pageError404 = require("./404/index");
async function routes(fastify) {
  fastify.register(pageError404);
  fastify.register(homeRoute);
}

module.exports = routes;
