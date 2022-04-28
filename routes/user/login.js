const loginCtrl = require("../../controller/user");
async function routes(fastify) {
  fastify.post(
    "/login",
    { onRequest: fastify.verifTokenValid },
    loginCtrl.login
  );
}

module.exports = routes;
