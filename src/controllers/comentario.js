const pool=require('../database');
const jwt=require('jsonwebtoken');

class ComentarioController{
    async getAll(req, res){
        try{
            const { id_producto }=req.params;
            const comentarios=await pool.query('SELECT * FROM comentarios WHERE id_producto=?', [id_producto]);
            res.json(comentarios);
        }catch(err){
            console.log(err);
            res.status(500).json('error interno');
        }
    }
    async add(req, res){
        try{
            const token=req.headers['access-token'].split(' ')[1];
            const id_usuario=jwt.verify(token, req.locals.keyjwt)._id;
            const { contenido, id_producto }=req.body;

            const newComentario={
                contenido,
                visto:false,
                id_usuario,
                id_producto
            };
            await pool.query('INSERT INTO comentarios SET ?', [newComentario]);
            res.json('comentario subido');
        }catch(err){
            console.log(err);
            res.status(500).json('error interno')
        }
    }
/*     async edit(req, res){

    } */
}

const comentarioController=new ComentarioController();
module.exports=comentarioController;