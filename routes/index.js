const homeRoute = require("./home/index");
const pageError404 = require("./404/index");
const signupUser = require("./user/signup");
const profilUser = require("./user/profil");
const loginUser = require("./user/login");
const users = require("./user/users");
const userDiscord = require("./user/discord");
const updateUser = require("./user/updateUser");

async function routes(fastify) {
  await fastify.register(pageError404);
  await fastify.register(homeRoute);
  await fastify.register(users);
  await fastify.register(signupUser);
  await fastify.register(loginUser);
  await fastify.register(profilUser);
  await fastify.register(updateUser);

  await fastify.register(userDiscord);
}

module.exports = routes;
