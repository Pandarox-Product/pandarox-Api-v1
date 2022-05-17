const discordCtrl = require("../../controller/discord");
async function routes(fastify) {
  await fastify.get("/auth/discord/callback/", discordCtrl.loginDiscord);
  await fastify.get(
    "/auth/discord/:id",
    { onRequest: fastify.verifTokenValid },
    discordCtrl.discord
  );
}

module.exports = routes;
