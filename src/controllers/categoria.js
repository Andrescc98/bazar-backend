const pool = require("../database");

class CategoriaController {
  async getAll(req, res) {
    try {
      const categorias = await pool.query("SELECT * FROM categoria");
      res.json(categorias);
    } catch (err) {
      console.log(err);
      res.status(500).json("error interno");
    }
  }
}

const categoriaController = new CategoriaController();
module.exports = categoriaController;
