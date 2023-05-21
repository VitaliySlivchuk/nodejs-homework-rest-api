const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscr,
  updateAvatar,
  verifyEmail,
  resendVerivicationEmail,
} = require("../../controlers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  schemas: { registerSchema, loginSchemas, subscrSchema, verifyEmailSchema },
} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.get("/verify/:verificationToken", verifyEmail);
router.post(
  "/verify",
  validateBody(verifyEmailSchema),
  resendVerivicationEmail
);
router.post("/login", validateBody(loginSchemas), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/", authenticate, validateBody(subscrSchema), updateSubscr);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
