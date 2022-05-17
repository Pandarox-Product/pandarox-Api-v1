require("dotenv").config();
const prisma = require("../server");
const { default: axios } = require("axios");
exports.loginDiscord = async (request, reply) => {
  const { code } = await request.query;

  if (code) {
    try {
      const userData = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `http://127.0.0.1:3000/api/auth/discord/callback/`,
        scope: "identify",
      });
      const response = await axios.post(
        "https://discord.com/api/oauth2/token",
        userData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { access_token, refresh_token } = response.data;
      console.log(access_token);
      console.log(refresh_token);
      console.log(response.data);
      // let date = new Date();
      // let userSucess = await prisma.user.update({
      //   data: {
      //     accessToken,
      //     refreshToken,
      //     createdAtAccessToken: date,
      //   },
      // });
      const dataUser = await axios.get("https://discord.com/api/v9/users/@me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const discordId = parseInt(dataUser.data.id);
      let date = new Date();
      await prisma.discord.create({
        data: {
          id: discordId,
          accessToken: access_token,
          refreshToken: refresh_token,
          usernameDiscord: dataUser.data.username,
          createdAtAccessToken: date,
        },
      });
      reply.redirect(`http://127.0.0.1:5500/user.html?id=${dataUser.data.id}`);
    } catch (error) {
      console.log(error);
    }
  }
};
exports.discord = async (request, reply) => {
  const discordId = request.params.id;
  console.log(request.token);
  const userUpdate = await prisma.user.update({
    where: {
      id: request.token.id,
    },
    data: {
      discordId: discordId,
    },
  });
  console.log(userUpdate);
};
