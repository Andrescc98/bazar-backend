const fs=require('fs');
const path=require('path');

module.exports= function(img){
    if(img){
        fs.unlinkSync(path.join(__dirname, `../public/upload/usuario/${img}`));
    }
}