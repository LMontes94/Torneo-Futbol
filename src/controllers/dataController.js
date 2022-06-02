const path = require('path');
const teamJson = require('../databaseJSON/teams');

const controlador = {
    position:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/position'));
   },
   calendar:(req,res) =>{
   const teams = teamJson.getUsers();
    res.render(path.join(__dirname,'../views/data/calendar'),{teams: teams});
   },
   teams:(req,res) =>{
      const teams = teamJson.getUsers();
      res.render(path.join(__dirname,'../views/data/teams'),{ teams: teams});
   },
   cards:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/cards'));
 },
   statistics:(req,res) =>{
    res.render(path.join(__dirname,'../views/data/statistics'));
 },
 squad:(req,res) =>{
    
    const archivoTeams = teamJson.getUsers();

      const team = archivoTeams[req.params.id-1];
    res.render(path.join(__dirname,'../views/data/squads'),{team:team})
 }
}

module.exports = controlador;