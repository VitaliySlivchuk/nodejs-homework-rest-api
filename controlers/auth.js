const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
//для створення тимчасової аватарки
const gravatar = require("gravatar");
const fs = require("fs/promises");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const { SECRET_KEY } = process.env;
//виходить на рівень вверх, шукає папку public,avatars
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  const hashPassword = await bcrypt.hash(password, 10);
  //створює аватарку якщо передати мило в url
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password is wrong");
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "logout success",
  });
};

const updateSubscr = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });
  res.status(204).json({
    message: "Subscription updated successfully",
  });
};
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  //береться тимчасовий шлях
  const { path: tempUpload, originalname } = req.file;
  //створюємо назву файла добавляючи id
  const fileName = `${_id}_${originalname}`;
  //створюється шлях де ава має зберігатись
  const resultUpload = path.join(avatarsDir, fileName);
  //з тимчасового масця переміщується куди вказано другим аргументом
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscr: ctrlWrapper(updateSubscr),
  updateAvatar: ctrlWrapper(updateAvatar),
};
