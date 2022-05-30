const path = require('path');

const controlador = {
   home:(req,res) =>{
    res.render(path.join(__dirname,'../views/home'));
   },
   rules:(req,res) =>{
    res.render(path.join(__dirname,'../views/rules'));
   },
   info:(req,res) =>{
      res.render(path.join(__dirname,'../views/info'));
   }
}

module.exports = controlador;