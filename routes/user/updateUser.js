const userUpdateCtrl = require("../../controller/user");
const multer = require("../../middleware/multer");
async function routes(fastify) {
  fastify.post(
    "/userUpdate",
    {
      preHandler: multer,
      onRequest: fastify.verifTokenValid,
    },
    userUpdateCtrl.updateUser
  );
}

module.exports = routes;
