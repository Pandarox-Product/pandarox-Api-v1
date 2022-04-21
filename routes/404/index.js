async function routes(fastify) {
  fastify.get("*", (request, reply) => {
    reply.code(404).send({
      error: "Not found 😥",
      status: "404",
    });
  });
}

module.exports = routes;
