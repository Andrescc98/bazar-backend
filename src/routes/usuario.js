const { Router }=require('express');
const usuarioController=require('../controllers/usuario');

const router=Router();

router.get('/', usuarioController.index);

module.exports=router;