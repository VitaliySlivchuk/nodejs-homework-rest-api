const {
  listContacts,
  getContactById,
  removeContact,
  add,
  updateContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { addSchemaPost, addSchemaPut } = require("../schemas/contacts");

const getAll = async (_, res) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (result === null) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addSchemaPost.validate(req.body);
  if (error) throw HttpError(400, "missing required name field");
  const result = await add(req.body);
  res.status(201).json(result);
};

const deletebyId = async (req, res) => {
  const { contactId } = req.params;
  const result = removeContact(contactId);
  if (result === null) throw HttpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { error } = addSchemaPut.validate(body);
  const result = await updateContact(contactId, body);
  if (result === null) throw HttpError(404, "Not found");
  if (error) throw HttpError(400, "missing field");
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deletebyId: ctrlWrapper(deletebyId),
  updateById: ctrlWrapper(updateById),
};
