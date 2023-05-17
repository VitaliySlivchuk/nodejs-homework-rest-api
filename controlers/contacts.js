const { Contact } = require("../models/contact");
const { ctrlWrapper, HttpError, nameFieldError } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  let query = { owner };
  if (favorite === "true") query = { ...query, favorite: true };
  const skip = (page - 1) * limit;
  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json({ result });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (result === null) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (result === null) throw HttpError(404, "Not found");
  res.status(200).json(result);
};
const updateFavorite = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
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
