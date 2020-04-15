const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.headers['authorization'];
    console.log(token);
    if(!token){
        return res.status(500).json('no estas logeado');
    }
    next();
}