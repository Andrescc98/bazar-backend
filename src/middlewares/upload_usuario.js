const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/usuario"),
  filename(req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && mimetype) {
      return cb(null, true);
    }
    cb("el archivo debe ser una imagen en formato jpg, jpeg, png");
  }
}).single("img_usuario");

module.exports = upload;
