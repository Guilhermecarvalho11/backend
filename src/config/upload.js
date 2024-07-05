const path = require("path");
const multer = require("multer"); //biblioteca que vai fazer o upload da img
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // de onde a img chega

const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); // onde a img vai ficar armazenada

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex"); // aqui garante que cada img vai ter um nome unico e n vai sobrepor a outra
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
