const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Введите логин и/или пароль" });
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JwtSecret;

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "5h" }),
      });
    } else {
      return res.status(400).json({ message: "Неверен логин или пароль" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Заполните поля" });
    }

    const candidate = await prisma.user.findFirst({
      where: { email },
    });

    if (candidate) {
      return res.status(400).json({ message: "Такой пользователь уже есть" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const secret = process.env.JwtSecret;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "5h" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Не удалось создать пользователя" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { login, register, current };

// test after fix
