var express = require("express");
const { login, register, current } = require("../controllers/users-ctrl");
const { authMiddleware } = require("../middleware/authMiddleware");
var router = express.Router();

/* GET users listing. */
// /api/v1/user/login
router.post("/login", login);

// /api/v1/user/register
router.post("/register", register);

// /api/v1/user/current
router.get("/current", authMiddleware, current);

module.exports = router;
