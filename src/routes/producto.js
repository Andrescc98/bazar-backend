const { Router }=require('express');
const path=require('path');
const multer=require('multer');

const router=Router();
const upload=multer({
    // storage:storage,
    dest:path.join(__dirname, '../public/upload/producto'),
/*     fileFilter:(req,file,cb)=>{
      const fileTypes=/jpg|jpeg|png/;
      const mimetype=fileTypes.test(file.mimetype);
      const extname=fileTypes.test(path.extname(file.originalname));
      if(mimetype && mimetype){
          return cb(null, true);
      }
      cb('error: el archivo debe ser una imagen');
  } */
  })

router.get('/', upload.single('img_producto'));

module.exports=router;