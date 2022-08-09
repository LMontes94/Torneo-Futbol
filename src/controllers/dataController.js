const path = require('path');
const dbJson = require('../databaseJSON/database');
const resultados = require('../../public/js/functions/cargarResults');
const fixture_db = path.resolve(__dirname, '../databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../databaseJSON/teams.json');
const players_db = path.join(__dirname, '../databaseJSON/jugadores.json');
const killers_db = path.join(__dirname, '../databaseJSON/goleadores.json');
const amonestados_db = path.join(__dirname, '../databaseJSON/amonestados.json');
const posiciones = require('../../public/js/functions/ordenarTeams');
const buscarTeams = require('../../public/js/functions/busquedaBinaria');

const controlador = {
   position: (req, res) => {
      var teams = dbJson.getUsers(teams_db);
      posiciones.ordenarTeams(teams);
      res.render(path.join(__dirname, '../views/data/results/position'), { teams: teams });
   },
   calendar: (req, res) => {
      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      res.render(path.join(__dirname, '../views/data/fecha/calendar'), { teams: teams, fixture: fixture });
   },
   teams: (req, res) => {
      const teams = dbJson.getUsers(teams_db);
      res.render(path.join(__dirname, '../views/data/teams/teams'), { teams: teams });
   },
   cards: (req, res) => {
      res.render(path.join(__dirname, '../views/data/teams/cards'));
   },
   statistics: (req, res) => {
      res.render(path.join(__dirname, '../views/data/teams/statistics'));
   },
   squad: (req, res) => {

      const archivoTeams = dbJson.getUsers(teams_db);
      const archivoPlayers = dbJson.getUsers(players_db);
      const players = archivoPlayers[req.params.id - 1];
      const team = archivoTeams[req.params.id - 1];
      res.render(path.join(__dirname, '../views/data/teams/squads'), { team: team, players: players })
   },
   results: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      res.render(path.join(__dirname, '../views/data/results/results.ejs'), { teams: teams, fixture: fixture });
   },
   fecha: (req, res) => {
      const fixture = dbJson.getUsers(fixture_db);
      res.render(path.join(__dirname, '../views/data/fecha/fechas.ejs'), { fixture: fixture });
   },
   fechaId: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);

      const fecha = fixture[req.params.id - 1];
      res.render(path.join(__dirname, '../views/data/results/resultsEdit.ejs'), { teams: teams, fecha: fecha });
   },
   matchsId: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const players = dbJson.getUsers(players_db);

      const nroMatch = req.params.idMatch;
      const fecha = fixture[req.params.id - 1];
      const match = fecha.partidos[nroMatch];
      res.render(path.join(__dirname, '../views/data/matchs/matchsId.ejs'), { teams: teams, fecha: fecha, match: match, nroMatch: nroMatch, players: players });
   },
   saveMatchs: (req, res) => {

      const fixture = dbJson.getUsers(fixture_db);
      const jugadores = dbJson.getUsers(players_db);
      const killers = dbJson.getUsers(killers_db);
      const amonestados = dbJson.getUsers(amonestados_db);
      var goalsteam1 = req.body.goalsT1;
      var goalsteam2 = req.body.goalsT2;
      var posFixture = req.params.id - 1;
      var posPartido = req.params.idMatch;
      let newKiller =
      {
         teamId: "",
         apellido: "",
         nombre: "",
         goles: ""
      }
      let newAmonestado =
      {
         teamId: "",
         apellido: "",
         nombre: "",
         amarilla: "",
         roja: ""
      }

      fixture[posFixture].partidos[posPartido].golteam1 = goalsteam1;
      fixture[posFixture].partidos[posPartido].golteam2 = goalsteam2;
     
      console.log(req.body.goalsT1)
      console.log(req.body.amarilla)
      console.log(req.body.roja);
      let cantJugadores = jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores.length;
      for (let i = 0; i < cantJugadores; i++) {
         let goalPlayer = 0;

         if (req.body.goals >= 1) {
            goalPlayer = jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].goles
            jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].goles = goalPlayer + req.body.goals;
            newKiller.teamId = fixture[posFixture].partidos[posPartido].equipo1;
            newKiller.apellido =  jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].apellido;
            newKiller.nombre =  jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].nombre;
            newKiller.goles = newKiller.goles + req.body.goals;
            fixture[posFixture].partidos[posPartido].klliersT1.push(newKiller);
            killers.push(newKiller);
         }
         if (req.body.amarrilla == true) {
            var cantAmarilla = jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].cards.yellow;
            jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].cards.yellow = cantAmarilla + 1;
            newAmonestado.teamId = fixture[posFixture].partidos[posPartido].equipo1;
            newAmonestado.apellido =  jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].apellido;
            newAmonestado.nombre =  jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].nombre;
            newAmonestado.amarilla = newAmonestado.amarilla + 1;
            fixture[posFixture].partidos[posPartido].amonestadosT1.push(newAmonestado);
            amonestados.push(newAmonestado);
         }
         if (req.body.roja == true) {
            var cantRoja = jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].cards.red;
            jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].cards.red = cantRoja + 1;
            newAmonestado.teamId = fixture[posFixture].partidos[posPartido].equipo1;
            newAmonestado.apellido =  jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].apellido;
            newAmonestado.nombre =  jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores[i].nombre;
            newAmonestado.roja = newAmonestado.roja + 1;
            fixture[posFixture].partidos[posPartido].amonestadosT1.push(newAmonestado);
            amonestados.push(newAmonestado);
         }

      }

      cantJugadores = jugadores[(fixture[posFixture].partidos[posPartido].equipo1) - 1].jugadores.length
      for (let i = 0; i < cantJugadores; i++) {
         let goalPlayer = 0;
         let j = 0;
         let k = 0;
         if (req.body.goals >= 1) {
            goalPlayer = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].goles
            jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].goles = goalPlayer + req.body.goals;
            newKiller.teamId = fixture[posFixture].partidos[posPartido].equipo2;
            newKiller.apellido =  jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].apellido;
            newKiller.nombre =  jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].nombre;
            newKiller.goles = newKiller.goles + req.body.goals;
            fixture[posFixture].partidos[posPartido].klliersT2.push(newKiller);
            killers.push(newKiller);
         }
         if (req.body.amarrilla == true) {
            var cantAmarilla = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].cards.yellow;
            jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].cards.yellow = cantAmarilla + 1;
            newAmonestado.teamId = fixture[posFixture].partidos[posPartido].equipo2;
            newAmonestado.apellido = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].apellido;
            newAmonestado.nombre = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].nombre;
            newAmonestado.amarilla = newAmonestado.amarilla + 1;
            fixture[posFixture].partidos[posPartido].amonestadosT2.push(newAmonestado);
            amonestados.push(newAmonestado);
         }
         if (req.body.roja == true) {
            var cantRoja = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].cards.red;
            jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].cards.red = cantRoja + 1;
            newAmonestado.teamId = fixture[posFixture].partidos[posPartido].equipo2;
            newAmonestado.apellido = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].apellido;
            newAmonestador.nombre = jugadores[(fixture[posFixture].partidos[posPartido].equipo2) - 1].jugadores[i].nombre;
            newAmonestado.roja = newAmonestado.roja + 1;
            fixture[posFixture].partidos[posPartido].amonestadosT2.push(newAmonestado);
            amonestados.push(newAmonestado);
         }

      }
      //console.log(killers)
      //console.log(amonestados)
      //fixture = dbJson.setUsers(fixture_db, fixture);
      //resultados.cargarResults(posFixture, posPartido);
      res.redirect('/data/resultados');
   },
   showMatch: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const players = dbJson.getUsers(players_db);

      const nroMatch = req.params.idMatch;
      const fecha = fixture[req.params.id - 1];
      const match = fecha.partidos[nroMatch];

      res.render(path.join(__dirname, '../views/data/matchs/editmatch.ejs'), { teams: teams, fecha: fecha, match: match, nroMatch: nroMatch, players: players });
   },
   editMatchs: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const nroMatch = req.params.idMatch;
      const fecha = fixture[req.params.id - 1];
      const match = fecha.partidos[nroMatch];

      res.redirect('/data/resultados');
   },
   editSquad: (req, res) => {

      const archivoTeams = dbJson.getUsers(teams_db);
      const team = archivoTeams[req.params.id - 1];
      res.render(path.join(__dirname, '../views/data/teams/squads'), { team: team })
   },
   agregarFecha: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);

      const partidos = fixture[0].partidos.length;
      res.render(path.join(__dirname, '../views/data/fecha/addFecha.ejs'), { teams: teams, partidos: partidos });
   },
   cargarFecha: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      let cantPartidos = fixture[0].partidos.length;
      let posteam1;
      let posteam2;
      let newFecha = req.body;
      let newPartidos =
      {
         fecha: fixture.length + 1,
         dia: "",
         partidos: [
            {
               id: 1,
               horario: "",
               cancha: "",
               equipo1: "",
               equipo2: "",
               golteam1: "",
               golteam2: "",
               jugado: false
            },
            {
               id: 2,
               horario: "",
               cancha: "",
               equipo1: "",
               equipo2: "",
               golteam1: "",
               golteam2: "",
               jugado: false
            },
            {
               id: 3,
               horario: "",
               cancha: "",
               equipo1: "",
               equipo2: "",
               golteam1: "",
               golteam2: "",
               jugado: false
            }, {
               id: 4,
               horario: "",
               cancha: "",
               equipo1: "",
               equipo2: "",
               golteam1: "",
               golteam2: "",
               jugado: false
            },
            {
               id: 5,
               horario: "",
               cancha: "",
               equipo1: "",
               equipo2: "",
               golteam1: "",
               golteam2: "",
               jugado: false
            }
         ],
         libre: ""
      }
      posiciones.ordenarXNombre(teams);
      for (let i = 0; i < cantPartidos; i++) {
         newPartidos.id = i + 1;
         newPartidos.partidos[i].horario = newFecha.time[i];
         newPartidos.partidos[i].cancha = newFecha.cancha[i];
         posteam1 = buscarTeams.busquedaBinaria(newFecha.team1[i], teams)
         posteam2 = buscarTeams.busquedaBinaria(newFecha.team2[i], teams)
         newPartidos.partidos[i].equipo1 = teams[posteam1].id;
         newPartidos.partidos[i].equipo2 = teams[posteam2].id;
      }
      let posfree = buscarTeams.busquedaBinaria(newFecha.libre, teams);
      newPartidos.libre = teams[posfree].id;
      fixture.push(newPartidos);
      dbJson.setUsers(fixture_db, fixture);
      res.redirect('/data/resultados/fecha');
   },
   createPlayer: (req, res) => {

      const teams = dbJson.getUsers(teams_db);
      const fixture = dbJson.getUsers(fixture_db);
      const team = teams[req.params.id - 1];
      const partidos = fixture[0].partidos.length;
      res.render(path.join(__dirname, '../views/data/teams/createPlayer.ejs'), { team: team, partidos: partidos, teams: teams });
   },
   savePlayer: (req, res) => {

      let plantilla = dbJson.getUsers(players_db);
      let data = req.body;

      let lastId = 0;
      if (plantilla[req.params.id - 1].jugadores[0].idJugador != 0) {
         lastId = plantilla[req.params.id - 1].jugadores.length;
         lastId++;
      } else {
         lastId = 1;
      }
      let newPlayer = {
         idJugador: lastId,
         apellido: "",
         nombre: "",
         dni: "",
         birthday: "",
         pj: 0,
         goles: 0,
         cards:
         {
            "yellow": 0,
            "red": 0
         }
      }
      newPlayer.apellido = data.last;
      newPlayer.nombre = data.name;
      newPlayer.dni = data.dni;
      newPlayer.birthday = data.date;

      plantilla[req.params.id - 1].jugadores.push(newPlayer);
      if (plantilla[req.params.id - 1].jugadores[0].idJugador == 0) {
         plantilla[req.params.id - 1].jugadores.splice(0, 1);
      }

      dbJson.setUsers(players_db, plantilla);
      res.redirect('/data/equipos/' + req.params.id);
   }
}
module.exports = controlador;