const path = require("path");
const multer = require("multer");
const uuid = require("uuid");
const pool = require("../database");
const util=require('util');

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/upload/usuario"),
  filename(req, file, cb) {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
});
const upload =/* util.promisify( */ multer({
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

module.exports = async function(req, res, next) {
/*   try{ */

 
upload(req, res, err=>{
    if(err instanceof multer.MulterError){
      return res.json(err instanceof multer.MulterError)
    }
    if(err){
      return res.json(err)
    }
  } );

    next();

}/* catch(err){
    console.log(err);
    return res.json({error:true, message:err});  
} */




