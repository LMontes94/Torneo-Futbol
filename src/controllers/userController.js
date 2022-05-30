const path = require('path');

const controlador = {
   login:(req,res) =>{
    res.render(path.join(__dirname,'../views/users/login'));
   },
   register:(req,res)=>{
      res.render(path.join(__dirname,'../views/users/register'))
   }
}

module.exports = controlador;