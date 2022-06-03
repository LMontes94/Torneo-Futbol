const path = require('path');
const dbJson = require('../databaseJSON/database');

const fixture_db = path.resolve(__dirname, '../databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../databaseJSON/teams.json');

const controlador = {
   position: (req, res) => {
      res.render(path.join(__dirname, '../views/data/position'));
   },
   calendar: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      res.render(path.join(__dirname, '../views/data/calendar'), { teams: teams, fixture: fixture });
   },
   teams: (req, res) => {
      const teams = dbJson.getUsers(teams_db);
      res.render(path.join(__dirname, '../views/data/teams'), { teams: teams });
   },
   cards: (req, res) => {
      res.render(path.join(__dirname, '../views/data/cards'));
   },
   statistics: (req, res) => {
      res.render(path.join(__dirname, '../views/data/statistics'));
   },
   squad: (req, res) => {

      const archivoTeams = dbJson.getUsers(teams_db);
      const team = archivoTeams[req.params.id - 1];
      res.render(path.join(__dirname, '../views/data/squads'), { team: team })
   }
}

module.exports = controlador;