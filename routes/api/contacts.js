const express = require("express");
const {
  getAll,
  getById,
  addContact,
  deletebyId,
  updateFavorite,
  updateById,
} = require("../../controlers/contacts");

const { isValidId, authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAll);
router.get("/:contactId", authenticate, isValidId, getById);
router.post(
  "/",
  authenticate,
  validateBody(schemas.schemaAddContact),
  addContact
);
router.delete("/:contactId", authenticate, isValidId, deletebyId);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.schemaUpdataContact),
  updateById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.schemaFavoriteContact),
  updateFavorite
);

module.exports = router;
