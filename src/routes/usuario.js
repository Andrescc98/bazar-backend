const { Router } = require("express");
const usuarioController = require("../controllers/usuario");
const image_usuario=require('../middlewares/image_usuario');

const router = Router();

router.get("/", usuarioController.getAll);
router.post("/",image_usuario, usuarioController.add);

module.exports = router;
