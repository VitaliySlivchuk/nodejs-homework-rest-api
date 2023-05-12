const express = require("express");
const {
  getAll,
  getById,
  addContact,
  deletebyId,
  updateById,
} = require("../../controlers/contacts");

const router = express.Router();

router.get("/", getAll);
router.get("/:contactId", getById);
router.post("/", addContact);
router.delete("/:contactId", deletebyId);
router.put("/:contactId", updateById);

module.exports = router;
