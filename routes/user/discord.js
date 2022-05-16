const discordCtrl = require("../../controller/discord");
async function routes(fastify) {
  await fastify.get("/auth/discord/callback/:id", discordCtrl.loginDiscord);
}

module.exports = routes;
