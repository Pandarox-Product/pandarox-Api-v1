const prisma = require("../server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (request, reply) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexAuteur = /^([^0-9]*)$/;
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  if (!regexEmail.test(request.body.email)) {
    return reply.status(400).send({
      message: "Invalid Email",
    });
  }
  if (!regexAuteur.test(request.body.author)) {
    return reply.status(400).send({
      message: "Invalid Author",
    });
  }
  if (!regexPassword.test(request.body.password)) {
    return reply.status(400).send({
      message: "Invalid password",
    });
  }
  if (!request.body.email || !request.body.password || !request.body.author) {
    return await reply.status(400).send({
      message: "Input Required",
    });
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: request.body.email,
    },
  });
  const authorExist = await prisma.user.findUnique({
    where: {
      author: request.body.author,
    },
  });
  if (userExist || authorExist) {
    return await reply.status(400).send({
      message: "Email or Author exist",
    });
  }

  try {
    const file = request.file ? request.file.filename : null;
    const hashPassword = await bcrypt.hash(request.body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: request.body.email,
        password: hashPassword,
        author: request.body.author,
        image: file,
      },
      select: {
        id: true,
        email: true,
        password: false,
        author: true,
        image: true,
        role: true,
        accessToken: false,
        refreshToken: false,
        usernameDiscord: false,
        idDiscord: false,
        createdAtAccessToken: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "24h",
      }
    );
    await reply.status(200).send({
      user,
      token,
    });
  } catch (error) {
    await reply({
      error,
    });
  }
};
exports.login = async (request, reply) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      author: true,
      image: true,
      role: true,
      accessToken: false,
      refreshToken: false,
      usernameDiscord: false,
      idDiscord: false,
      createdAtAccessToken: false,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) {
    return await reply.status(400).send({
      message: "User not found",
    });
  }
  const valid = await bcrypt.compare(request.body.password, user.password);
  if (!valid) {
    return await reply.status(400).send({
      message: "Invalid Password ",
    });
  }
  try {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "24h",
      }
    );
    return await reply.status(200).send({
      user,
      token,
    });
  } catch (error) {
    await reply.send({
      error,
    });
  }
};
exports.profile = async (request, reply) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: request.token.id,
      },
      select: {
        id: true,
        email: true,
        password: true,
        author: true,
        image: true,
        role: true,
        accessToken: false,
        refreshToken: false,
        usernameDiscord: true,
        idDiscord: true,
        createdAtAccessToken: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return await reply.status(404).send({
        message: "User not found",
      });
    }
    await reply.send({
      user,
    });
  } catch (error) {
    await reply.status(500).send(error);
  }
};
