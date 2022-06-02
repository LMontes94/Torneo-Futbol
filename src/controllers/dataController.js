const path = require('path');
const fs = require('fs');

const controlador = {
    position:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/position'));
   },
   calendar:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/calendar'));
   },
   teams:(req,res) =>{
      const archivoTeams = fs.readFileSync(path.resolve(__dirname,'../databaseJSON/teams.json'), {encoding: 'utf-8'});
      let teams;
      if(archivoTeams === ""){
         teams = [];
      }else{
         teams = JSON.parse(archivoTeams);
      }
       
      console.log(teams.jugadores);
      res.render(path.join(__dirname,'../views/data/teams'),{ teams: teams});
   },
   cards:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/cards'));
 },
   statistics:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/statistics'));
 },
 squad:(req,res) =>{
    
    const archivoTeams = fs.readFileSync(path.resolve(__dirname,'../databaseJSON/teams.json'), {encoding: 'utf-8'});
      let teams;
      if(archivoTeams === ""){
         teams = [];
      }else{
         teams = JSON.parse(archivoTeams);
      }

      const team = teams[req.params.id-1];
    res.render(path.join(__dirname,'../views/data/squads'),{team:team})
 }
}

module.exports = controlador;