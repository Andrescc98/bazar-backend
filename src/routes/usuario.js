const { Router } = require("express");
const usuarioController = require("../controllers/usuario");
const upload = require("../middlewares/upload_usuario");
const estaLogeado=require('../middlewares/estaLogeado');

const router = Router();

router.post('/login', usuarioController.login);
router.get('/logout', usuarioController.logout);
router.get("/", usuarioController.getAll);
router.post("/", upload, usuarioController.add);
router.get("/:id", estaLogeado, usuarioController.getOne);
router.put("/:id", estaLogeado, upload, usuarioController.edit);
router.delete("/:id", estaLogeado, usuarioController.delete);


module.exports = router;
