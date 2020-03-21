class UsuarioController {
  getAll(req, res) {
    res.send("hola mundo");
  }

  add(req, res) {
    try {
      const { nombre_usuario, correo, telefono, password } = req.body;
      const newUser = {
        nombre_usuario,
        correo,
        telefono,
        img_usuario: req.file.filename,
        password
      };
      console.log(newUser);
      res.json("enviado");
    } catch (err) {
      res.json({ error: true, message: err });
    }
  }
}

const usuarioController = new UsuarioController();
module.exports = usuarioController;
