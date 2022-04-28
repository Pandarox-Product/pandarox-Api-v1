const signupCtrl = require("../../controller/user");
const multer = require("../../middleware/multer");
async function routes(fastify) {
  fastify.post("/signup", { preHandler: multer }, signupCtrl.signup);
}

module.exports = routes;
