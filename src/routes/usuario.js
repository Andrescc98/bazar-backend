const { Router } = require("express");
const usuarioController = require("../controllers/usuario");
const upload = require("../middlewares/upload_usuario");

const router = Router();

router.get("/", usuarioController.getAll);
router.post("/", upload, usuarioController.add);
// router.get('/:nombre_usuario', )

module.exports = router;
