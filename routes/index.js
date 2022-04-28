const homeRoute = require("./home/index");
const pageError404 = require("./404/index");
const signupUser = require("./user/signup");
const profilUser = require("./user/profil");
const loginUser = require("./user/login");
async function routes(fastify) {
  await fastify.register(pageError404);
  await fastify.register(homeRoute);
  await fastify.register(signupUser);
  await fastify.register(loginUser);
  await fastify.register(profilUser);
}

module.exports = routes;
