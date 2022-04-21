exports.home = (request, reply) => {
  reply.send({
    hello: 'world',
  });
};
