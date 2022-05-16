const usersCtrl = require("../../controller/user");
async function routes(fastify) {
  fastify.get("/users", usersCtrl.users);
}

module.exports = routes;
