const path = require('path');

const controlador = {
   home:(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/home.html'));
   },
   rules:(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/rules.html'));
   },
   info:(req,res) =>{
      res.sendFile(path.join(__dirname,'../views/info.html'));
   }
}

module.exports = controlador;