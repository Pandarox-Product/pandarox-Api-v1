require("dotenv").config();
// const prisma = require("../server");
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
      const { accessToken, refreshToken } = response.data;
      console.log(accessToken);
      console.log(refreshToken);
      console.log(response.data);
      // let date = new Date();
      // let userSucess = await prisma.user.update({
      //   data: {
      //     accessToken,
      //     refreshToken,
      //     createdAtAccessToken: date,
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  }
};
