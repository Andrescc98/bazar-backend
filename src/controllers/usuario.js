const pool=require('../database');
const { encryptPassword, matchPassword }=require('../libs/helpers');

class UsuarioController {
  getAll(req, res) {
    res.send("hola mundo");
  }

  async add(req, res) {
    try {
      const { nombre_usuario, correo, telefono, contrasena } = req.body;

      const newUser = {
        nombre_usuario,
        correo,
        telefono,
        img_usuario: req.file.filename,
        contrasena:await encryptPassword(contrasena)
      };
      console.log(newUser);
      await pool.query('INSERT INTO usuario SET ?', [newUser]);
      res.json("enviado");

    } catch (err) {
      console.log('error usuarioController');
      res.json({ error: true, message: err });
    }
  }

}

const usuarioController = new UsuarioController();
module.exports = usuarioController;
