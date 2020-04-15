const pool = require("../database");
const jwt=require('jsonwebtoken');
const path=require('path');
const fs=require('fs');

class ProductoControler{
    async getAll(req, res){
        try{
            const productos=await pool.query('SELECT * FROM productos');
            res.json(productos);
        }catch(err){
            console.log(err);
            res.status(500).json('error interno')
        }
        
    }
    async add(req, res){
        try{
            const token=req.headers['authorization'].split(' ')[1];
            const { titulo, descripcion, precio, stock, id_categoria }=req.body;
            const img=req.file? req.file.filename:'';
            const id_usuario=jwt.verify(token, req.locals.keyjwt)._id;


            const newProducto={
                titulo,
                descripcion,
                img_producto:img,
                precio:parseInt(precio),
                stock,
                id_usuario,
                id_categoria
            }
            
                
            await pool.query('INSERT INTO productos SET ?', [newProducto]);
            res.json('producto publicado');
        }catch(err){
            console.log(err);
            res.status(500).json('error interno');
        }
    }
    async getOne(req, res){
        try{        
            const { id }=req.params;

            const producto=await pool.query('SELECT * FROM productos WHERE id_producto=?', [id]);
            res.json(producto[0]);
        }catch(err){
            console.log(err);
            res.status(500).json('error interno');
        }
    }
    async edit(req, res){
        try{
            const {id}=req.params;
            const token=req.headers['authorization'].split(' ')[1];
            const { titulo, descripcion, precio, stock, id_categoria }=req.body;
            const img=req.file? req.file.filename:'';
            const id_usuario=jwt.verify(token, req.locals.keyjwt)._id;
            const producto=await pool.query('SELECT * FROM productos WHERE id_producto=?', [id])
            var editProducto;
            
            if(!producto[0]){
                return res.status(404).json('el producto no existe');
            }
            if(img){
                if(producto[0].img_producto){
                    fs.unlinkSync(path.join(__dirname, `../public/upload/producto/${producto[0].img_producto}`));
                }
                editProducto={
                    titulo,
                    descripcion,
                    img_producto:img,
                    precio:parseInt(precio),
                    stock,
                    id_usuario,
                    id_categoria
                }
            }else{
            editProducto={
                titulo,
                descripcion,                
                precio:parseInt(precio),
                stock,
                id_usuario,
                id_categoria
            } 
            }
                
            await pool.query('UPDATE productos SET ? WHERE id_producto=?', [editProducto, id]);
            res.json('producto actualizado');
        }catch(err){
            console.log(err);
            res.status(500).json('error interno');
        }
    }
    async delete(req, res){
        try{
            const token=req.headers['authorization'].split(' ')[1];
            const id_usuario=jwt.verify(token, req.locals.keyjwt)._id;            
            const {id}=req.params;
            const producto=await pool.query('SELECT * FROM productos WHERE id_producto=?', [id]);

            if(!producto[0]){
                return res.status(404).json('el producto no existe');
            }
            if(producto[0].img_producto){
                fs.unlinkSync(path.join(__dirname, `../public/upload/producto/${producto[0].img_producto}`));
            }
            
            await pool.query('DELETE FROM productos WHERE id_producto=? AND id_usuario=?',[id, id_usuario]);
            res.json('producto borrado');
        }catch(err){
            console.log(err);
            res.status(500).json('error interno');
        }
    }
    async getAllUser(req,res){
        try{
            const token=req.headers['authorization'].split(' ')[1];
            const id_usuario=jwt.verify(token, req.locals.keyjwt)._id;
            console.log(id_usuario);
            const productos=await pool.query('SELECT * FROM productos WHERE id_usuario=?', [id_usuario]);
            res.json(productos[0]? productos:'no existen productos de ese usuario');
        }catch(err){
            console.log(err);
            res.status(500).json('error interno')
        }
    }
}

const productoControler=new ProductoControler();
module.exports=productoControler;