const profilCtrl = require("../../controller/user");
async function routes(fastify) {
  fastify.get(
    "/profil",
    { onRequest: fastify.verifTokenValid },
    profilCtrl.profile
  );
}

module.exports = routes;
