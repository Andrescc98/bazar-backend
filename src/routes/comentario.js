const { Router }=require('express');
const comentarioController=require('../controllers/comentario');
const estaLogeado=require('../middlewares/estaLogeado');

const router=Router();

router.get('/:id_producto', comentarioController.getAll);
router.post('/', estaLogeado, comentarioController.add);
// router.put('/:id_comentario', estaLogeado, )


module.exports=router;