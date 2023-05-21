const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscr,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controlers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  schemas: { registerSchema, loginSchemas, subscrSchema, varifySchema },
} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateBody(varifySchema), resendVerifyEmail);
router.post("/login", validateBody(loginSchemas), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/", authenticate, validateBody(subscrSchema), updateSubscr);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
