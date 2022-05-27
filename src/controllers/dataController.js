const path = require('path');

const controlador = {
    position:(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/data/position.html'));
   },
   calendar:(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/data/calendar.html'));
   },
   squads:(req,res) =>{
      res.sendFile(path.join(__dirname,'../views/data/squads.html'));
   },
   cards:(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/data/cards.html'));
 },
   statistics:(req,res) =>{
    res.sendFile(path.join(__dirname,'../views/data/statistics.html'));
 },
}

module.exports = controlador;