const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controlers/auth");
const { validateBody, authenticate } = require("../../middlewares");
const {
  schemas: { registerSchema, loginSchemas },
} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchemas), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);

module.exports = router;
