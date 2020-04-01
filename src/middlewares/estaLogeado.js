const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.headers['access-token'];
    console.log(token);
    if(!token){
        return res.status(500).json('no estas logeado');
    }
    next();
}