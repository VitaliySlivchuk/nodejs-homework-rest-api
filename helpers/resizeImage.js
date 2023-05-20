const Jimp = require("jimp");

const HttpError = require("./HttpError");

const resizeImage = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    image.resize(250, 250);
    await image.writeAsync(imagePath);
  } catch (error) {
    throw HttpError(404);
  }
};

module.exports = resizeImage;
