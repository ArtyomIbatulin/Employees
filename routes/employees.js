var express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
var router = express.Router();
const {
  all,
  add,
  remove,
  edit,
  employee,
} = require("../controllers/employees-ctrl");

/* GET employees listing. */
// /api/v1/employees/
router.get("/", authMiddleware, all);

// /api/v1/employees/:id
router.get("/:id", authMiddleware, employee);

// /api/v1/employees/add
router.post("/add", authMiddleware, add);

// /api/v1/employee/remove/:id
router.post("/remove/:id", authMiddleware, remove);

// /api/v1/employee/edit/:id
router.put("/edit/:id", authMiddleware, edit);

module.exports = router;
