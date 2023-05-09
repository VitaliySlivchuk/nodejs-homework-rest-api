const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const addSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (result === null) throw HttpError(404, "Not found");
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchemaPost.validate(req.body);
    if (error) throw HttpError(400, "missing required name field");
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = removeContact(contactId);
    if (result === null) throw HttpError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const { error } = addSchemaPut.validate(body);
    const result = await updateContact(contactId, body);
    if (result === null) throw HttpError(404, "Not found");
    if (error) throw HttpError(400, "missing field");
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
