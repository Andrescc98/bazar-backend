const pool = require("../database");
const existe_usuario = require("../middlewares/existe_usuario");
const { encryptPassword, matchPassword } = require("../libs/helpers");

class UsuarioController {
  getAll(req, res) {
    res.send("hola mundo");
  }

  async add(req, res) {
    try {
      const { nombre_usuario, correo, telefono, contrasena } = req.body;
      const img = req.file ? req.file.filename : false;

      const usuario_existente = await existe_usuario(
        { nombre_usuario, correo },
        img
      );
      if (usuario_existente) {
        return res.status(500).json("usuario o correo existente");
      }
      const newUser = {
        nombre_usuario,
        correo,
        telefono,
        img_usuario: img? img : '',
        contrasena: await encryptPassword(contrasena)
      };
      console.log(newUser);
      await pool.query("INSERT INTO usuario SET ?", [newUser]);
      res.json("usuario guardado");
      
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

const usuarioController = new UsuarioController();
module.exports = usuarioController;
