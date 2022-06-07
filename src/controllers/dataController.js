const path = require('path');
const dbJson = require('../databaseJSON/database');

const fixture_db = path.resolve(__dirname, '../databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../databaseJSON/teams.json');

const controlador = {
   position: (req, res) => {
      const teams = dbJson.getUsers(teams_db);
      res.render(path.join(__dirname, '../views/data/position'), { teams: teams });
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
   },
   results: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      res.render(path.join(__dirname, '../views/data/results.ejs'), { teams: teams, fixture: fixture });
   },
   fecha: (req, res) => {
      const fixture = dbJson.getUsers(fixture_db);
      res.render(path.join(__dirname, '../views/data/fechas.ejs'), { fixture: fixture });
   },
   fechaId: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);

      const fecha = fixture[req.params.id - 1];
      res.render(path.join(__dirname, '../views/data/fechaEdit.ejs'), { teams: teams, fecha: fecha });
   },
   matchsId: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const nroMatch = req.params.idMatch;
      const fecha = fixture[req.params.id - 1];
      const match = fecha.partidos[nroMatch];

      res.render(path.join(__dirname, '../views/data/matchsId.ejs'), { teams: teams, fecha: fecha, match: match,nroMatch:nroMatch });
   },
   saveMatchs: (req, res) => {

      var fixture = dbJson.getUsers(fixture_db);
      var goalsteam1 = req.body.results1;
      var goalsteam2 = req.body.results2;
      fixture[req.params.id-1].partidos[req.params.idMatch].golteam1 = goalsteam1;
      fixture[req.params.id-1].partidos[req.params.idMatch].golteam2 = goalsteam2;
      fixture = dbJson.setUsers(fixture_db,fixture);
      res.redirect('/data/resultados');
   }
}

module.exports = controlador;