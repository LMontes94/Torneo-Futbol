const path = require('path');
const dbJson = require('../databaseJSON/database');
const resultados = require('../../public/js/functions/cargarResults');
const posiciones = require('../../public/js/functions/ordenarTeams');
const fixture_db = path.resolve(__dirname, '../databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../databaseJSON/teams.json');

const controlador = {
   position: (req, res) => {
      var teams = dbJson.getUsers(teams_db);
      posiciones.ordenarTeams(teams);
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
      res.render(path.join(__dirname, '../views/data/resultsEdit.ejs'), { teams: teams, fecha: fecha });
   },
   matchsId: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const nroMatch = req.params.idMatch;
      const fecha = fixture[req.params.id - 1];
      const match = fecha.partidos[nroMatch];

      res.render(path.join(__dirname, '../views/data/matchsId.ejs'), { teams: teams, fecha: fecha, match: match, nroMatch: nroMatch });
   },
   saveMatchs: (req, res) => {

      var fixture = dbJson.getUsers(fixture_db);
      var goalsteam1 = req.body.results1;
      var goalsteam2 = req.body.results2;
      var posFixture = req.params.id - 1;
      var posPartido = req.params.idMatch;

      fixture[posFixture].partidos[posPartido].golteam1 = goalsteam1;
      fixture[posFixture].partidos[posPartido].golteam2 = goalsteam2;
      fixture = dbJson.setUsers(fixture_db, fixture);
      resultados.cargarResults(posFixture, posPartido);
      res.redirect('/data/resultados');
   },
   showMatch: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const nroMatch = req.params.idMatch;
      const fecha = fixture[req.params.id - 1];
      const match = fecha.partidos[nroMatch];

      res.render(path.join(__dirname, '../views/data/editmatch.ejs'), { teams: teams, fecha: fecha, match: match, nroMatch: nroMatch });
   },
   editSquad: (req, res) => {

      const archivoTeams = dbJson.getUsers(teams_db);
      const team = archivoTeams[req.params.id - 1];
      res.render(path.join(__dirname, '../views/data/squads'), { team: team })
   },
   agregarFecha: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);

      const partidos = fixture[0].partidos.length;
      res.render(path.join(__dirname, '../views/data/addFecha.ejs'), { teams: teams, partidos: partidos });
   },
   cargarFecha: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      let cantPartidos = fixture.partidos[0].length;
      let idTeam = 0;
      let newFecha = req.body;
      let newPartidos = [
         {
            fecha: 5,
            dia: "10/06/22",
            partidos: [
               {
                  id: 0,
                  horario: "",
                  cancha: "",
                  equipo1: "",
                  equipo2: "",
                  golteam1: "",
                  golteam2: "",
                  jugado: false
               },
               {
                  id: 0,
                  horario: "",
                  cancha: "",
                  equipo1: "",
                  equipo2: "",
                  golteam1: "",
                  golteam2: "",
                  jugado: false
               },
               {
                  id: 0,
                  horario: "",
                  cancha: "",
                  equipo1: "",
                  equipo2: "",
                  golteam1: "",
                  golteam2: "",
                  jugado: false
               },{
                  id: 0,
                  horario: "",
                  cancha: "",
                  equipo1: "",
                  equipo2: "",
                  golteam1: "",
                  golteam2: "",
                  jugado: false
               },
               {
                  id: 0,
                  horario: "",
                  cancha: "",
                  equipo1: "",
                  equipo2: "",
                  golteam1: "",
                  golteam2: "",
                  jugado: false
               }
            ]
         }
      ]

      for(let i = 0; i < cantPartidos; i++){
         newPartidos.id = i + 1;
         newPartidos.partidos[i].horario = newFecha.time; 
         newPartidos.partidos[i].cancha = newFecha.cancha;
         idTeam = teams.filter();
         newPartidos.partidos[i].equipo1 = newFecha
      }
      console.log(newPartidos);
      res.redirect('/data/resultados/fecha');
   }
}
module.exports = controlador;