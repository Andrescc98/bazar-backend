const jwt=require('jsonwebtoken');
const pool = require("../database");
const existe_usuario = require("../middlewares/existe_usuario");
const { encryptPassword, matchPassword } = require("../libs/helpers");
const borrar_imagen = require("../libs/eliminar_img");

class UsuarioController {
  async login(req, res) {
    try {
      const { correo, contrasena } = req.body;

      const usuario = await pool.query("SELECT * FROM usuario WHERE correo=?", [
        correo
      ]);
      if (!usuario[0]) {
        return res.status(404).json("correo invalido");
      }

      const contrasenaValida = await matchPassword(
        contrasena,
        usuario[0].contrasena
      );
      if (!contrasenaValida) {
        return res.status(404).json("contraseña invalida");
      }
      console.log(req.session.userid);
      req.session.userid=usuario[0].id_usuario;
      console.log(req.session.userid);
      res.json("ok");
    } catch (err) {

      console.log(err);
      res.status(500).json("error interno");
    }
  }

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
        img_usuario: img ? img : "",
        contrasena: await encryptPassword(contrasena)
      };

      await pool.query("INSERT INTO usuario SET ?", [newUser]);
      res.json("usuario guardado");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;

      const usuario = await pool.query(
        "SELECT * FROM usuario WHERE id_usuario=?",
        [id]
      );
      if (!usuario[0]) {
        return res.status(404).json("usuario inexistente");
      }
      res.json(usuario);
    } catch (err) {
      console.log(err);
    }
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const { nombre_usuario, correo, telefono, contrasena } = req.body;
      const img = req.file ? req.file.filename : false;
      var editUser;
      const usuario = await pool.query(
        "SELECT * FROM usuario WHERE id_usuario=?",
        [id]
      );
      if (!usuario[0]) {
        return res.status(404).json("usuario inexistente");
      }
      if (img) {
        borrar_imagen(usuario[0].img_usuario);
        editUser = {
          nombre_usuario,
          correo,
          telefono,
          img_usuario: img,
          contrasena: await encryptPassword(contrasena)
        };
      } else {
        editUser = {
          nombre_usuario,
          correo,
          telefono,
          contrasena: await encryptPassword(contrasena)
        };
      }

      await pool.query("UPDATE usuario SET ? WHERE id_usuario = ?", [
        editUser,
        id
      ]);
      res.json("usuario editado");
    } catch (err) {
      console.log(err);
      res.status(500).json("error interno");
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const usuario = await pool.query(
        "SELECT * FROM usuario WHERE id_usuario=?",
        [id]
      );
      if (!usuario[0]) {
        return res.status(404).json("usuario inexistente");
      }
      borrar_imagen(usuario[0].img_usuario);
      await pool.query("DELETE FROM usuario WHERE id_usuario=?", [id]);
      res.json("usuario borrado");
    } catch (err) {
      console.log(err);
      res.status(500).json("error interno");
    }
  }
  logout(req, res){
    req.session=null;
    res.json('sesion cerrada');
  }
}

const usuarioController = new UsuarioController();
module.exports = usuarioController;
