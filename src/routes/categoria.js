const { Router }=require('express');
const categoriaController=require('../controllers/categoria');

const router=Router();

router.get('/', categoriaController.getAll);

module.exports=router;