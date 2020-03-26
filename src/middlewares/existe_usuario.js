const pool = require("../database");
const comprobar_img = require("../libs/eliminar_img");

module.exports = async function(obj, img) {
  try {
    const existe_usuario = await pool.query(
      "SELECT * FROM usuario WHERE nombre_usuario=?",
      [obj.nombre_usuario]
    );

    const existe_correo = await pool.query(
      "SELECT * FROM usuario WHERE correo=?",
      [obj.correo]
    );

    if (existe_usuario[0]) {
      comprobar_img(img);
      return true;
    }

    if (existe_correo[0]) {
      comprobar_img(img);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};
