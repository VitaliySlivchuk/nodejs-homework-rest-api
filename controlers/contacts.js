const { Contact, schemas } = require("../models/contact");
const { ctrlWrapper, HttpError, nameFieldError } = require("../helpers");

const getAll = async (_, res) => {
  //const result = await Contact.find({}, 'name'); відповідь: gjkt nskmrb з іменем title
  //const result = await Contact.find({}, '-name'); відповідь: все поля окрім title
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (result === null) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = schemas.schemaAddContact.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required ${nameFieldError(error)} field`);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const { error } = schemas.schemaUpdataContact.validate(body);
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (result === null) throw HttpError(404, "Not found");
  if (error) throw HttpError(400, "missing field");
  res.status(200).json(result);
};
const updateFavorite = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  console.log(contactId);
  const { error } = schemas.schemaFavoriteContact.validate(body);
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (error) throw HttpError(400, "missing field favorite");
  if (result === null) throw HttpError(404, "Not found");
  res.status(200).json(result);
};

const deletebyId = async (req, res) => {
  const { contactId } = req.params;
  const result = Contact.findByIdAndRemove(contactId);
  if (result === null) throw HttpError(404, "Not found");
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deletebyId: ctrlWrapper(deletebyId),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
