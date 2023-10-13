const { prisma } = require("../prisma/prisma-client");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JwtSecret);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Не авторизован" });
  }
};

module.exports = { authMiddleware };
