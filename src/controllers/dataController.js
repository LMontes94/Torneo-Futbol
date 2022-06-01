const path = require('path');
const fs = require('fs');

const controlador = {
    position:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/position'));
   },
   calendar:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/calendar'));
   },
   squads:(req,res) =>{
      const archivoTeams = fs.readFileSync(path.resolve(__dirname,'../databaseJSON/teams.json'), {encoding: 'utf-8'});
      let teams;
      if(archivoTeams === ""){
         teams = [];
      }else{
         teams = JSON.parse(archivoTeams);
      }
       
      console.log(teams);
      res.render(path.join(__dirname,'../views/data/squads'),{ teams: teams});
   },
   cards:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/cards'));
 },
   statistics:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/statistics'));
 },
}

module.exports = controlador;