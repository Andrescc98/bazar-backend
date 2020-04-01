const { Router }=require('express');
const upload=require('../middlewares/upload_producto');
const productoController=require('../controllers/producto');
const estaLogeado=require('../middlewares/estaLogeado')

const router=Router();

router.get('/', productoController.getAll);
router.post('/', estaLogeado, upload, productoController.add);
router.get('/lista', estaLogeado, productoController.getAllUser);
router.put('/:id', estaLogeado, upload, productoController.edit);
router.delete('/:id', estaLogeado, productoController.delete);
router.get('/:id', productoController.getOne);

module.exports=router;