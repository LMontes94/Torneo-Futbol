const path = require('path');

const controlador = {
    position:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/position'));
   },
   calendar:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/calendar'));
   },
   squads:(req,res) =>{
      res.render(path.join(__dirname,'../views/data/squads'));
   },
   cards:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/cards'));
 },
   statistics:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/statistics'));
 },
}

module.exports = controlador;