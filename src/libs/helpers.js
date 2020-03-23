const bcrycpt=require('bcryptjs');
const helpers={};

//genera el hash de la contraseña
helpers.encryptPassword=async password=>{
    const salt= await bcrycpt.genSalt(10);
    const hash= await bcrycpt.hash(password,salt);
    return hash;
}

//valida la contraseña
helpers.matchPassword= async (password, savePassword)=>{
    try{
        const validPassword= await bcrycpt.compare(password, savePassword);
        return validPassword;
    }catch(error){
        console.log(error)
    }
}

module.exports=helpers;