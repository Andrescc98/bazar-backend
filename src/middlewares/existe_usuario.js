const pool = require("../database");
const fs=require('fs');
const path=require('path');

module.exports = async function (req, res, next) {
  try{
  const {nombre_usuario,correo}=req.body;
  const img_usuario=req.file.filename; 
  console.log( img_usuario, nombre_usuario, correo);
  const existe_usuario = await pool.query(
    "SELECT * FROM usuario WHERE nombre_usuario=?",
    [nombre_usuario]

  );

  const existe_correo = await pool.query(
    "SELECT * FROM usuario WHERE correo=?",
    [correo]
  );

  if (existe_usuario[0]) {
    fs.unlinkSync(path.join(__dirname, `../public/upload/usuario/${img_usuario}`));
    return res.json('usuario existente');
  }

  if (existe_correo[0]) {
    fs.unlinkSync(path.join(__dirname, `../public/upload/usuario/${img_usuario}`));
    return res.json('usuario con correo existente')
  }
  next();
}catch(err){
  console.log(err);
}

};
