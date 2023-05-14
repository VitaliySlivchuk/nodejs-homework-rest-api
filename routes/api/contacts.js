const express = require("express");
const {
  getAll,
  getById,
  addContact,
  deletebyId,
  updateFavorite,
  updateById,
} = require("../../controlers/contacts");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", isValidId, getById);
router.post("/", addContact);
router.delete("/:contactId", isValidId, deletebyId);
router.put("/:contactId", isValidId, updateById);
router.patch("/:contactId/favorite", isValidId, updateFavorite);

module.exports = router;
