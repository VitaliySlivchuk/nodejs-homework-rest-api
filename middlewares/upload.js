const multer = require("multer");
const path = require("path");

//створюється шлях до тимчасової папки
const tempDir = path.join(__dirname, "../", "temp");

//налаштування
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filenameK: (req, file, cb) => {
    cb(null, file.originalName);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
