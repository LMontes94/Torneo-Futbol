const path = require('path');
const dbJson = require('../../../src/databaseJSON/database');

const fixture_db = path.resolve(__dirname, '../../../src/databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../../../src/databaseJSON/teams.json');
const killers_db = path.join(__dirname, '../../../src/databaseJSON/goleadores.json');
const amonestados_db = path.join(__dirname, '../../../src/databaseJSON/amonestados.json')
module.exports = {
    cargarResults: (posFixture, posPartido) => {
        var fixture = dbJson.getUsers(fixture_db);
        var teams = dbJson.getUsers(teams_db);

        teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].pj++;
        teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].pj++;
        teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gaf = parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gaf) + parseInt(fixture[posFixture].partidos[posPartido].golteam1);
        teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gaf = parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gaf) + parseInt(fixture[posFixture].partidos[posPartido].golteam2);
        teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gec = parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gec) + parseInt(fixture[posFixture].partidos[posPartido].golteam2);
        teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gec = parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gec) + parseInt(fixture[posFixture].partidos[posPartido].golteam1);
        teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].df =
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gaf - teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gec;
        teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].df =
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gaf - teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gec;

        if (fixture[posFixture].partidos[posPartido].golteam1 === fixture[posFixture].partidos[posPartido].golteam2) {
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].e++;
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].e++;

            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].points++;
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].points++;
        } else if (parseInt(fixture[posFixture].partidos[posPartido].golteam1) < parseInt(fixture[posFixture].partidos[posPartido].golteam2)) {
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].p++;
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].g++;
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].points = teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].points + 3;
        } else {
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].p++;
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].g++;
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].points = teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].points + 3;
        }
        fixture[posFixture].partidos[posPartido].jugado = true;
        teams = dbJson.setUsers(teams_db, teams);
    },
    cargarKillers(jugadores, cantJugadores, goalsXPlayer, killersXTeam) {
      
        const killers = dbJson.getUsers(killers_db);

        let newKiller =
        {
            teamId: 0,
            apellido: "",
            nombre: "",
            goles: 0
        };
        j = 0;
        for (let i = 0; i < cantJugadores; i++) {
            let goalPlayer = 0;
            newKiller =
            {
                teamId: 0,
                apellido: "",
                nombre: "",
                goles: 0
            };

            if (goalsXPlayer[j] >= 1) {
                goalPlayer = jugadores.jugadores[i].goles
                jugadores.jugadores[i].goles = goalPlayer + parseInt(goalsXPlayer[j]);

                newKiller.teamId = jugadores.idTeam;
                newKiller.apellido = jugadores.jugadores[i].apellido;
                newKiller.nombre = jugadores.jugadores[i].nombre;
                newKiller.goles = newKiller.goles + parseInt(goalsXPlayer[j]);
                killersXTeam.push(newKiller)
                killers.push(newKiller);
            }
            j++;
        }

        dbJson.setUsers(killers_db,killers);
    },
    cargarAmonestados(jugadores, cantJugadores, amarillasXTeam, rojaXTeam,amonestadosXTeam) {
        const amonestados = dbJson.getUsers(amonestados_db);

        let newAmonestado =
        {
            teamId: 0,
            apellido: "",
            nombre: "",
            amarilla: 0,
            roja: 0
        };
        let k = 0;
        let l = 0;
        amonestadosXTeam = [];
        for (let i = 0; i < cantJugadores; i++) {
            newAmonestado =
            {
                teamId: 0,
                apellido: "",
                nombre: "",
                amarilla: 0,
                roja: 0
            };
          
            if (amarillasXTeam && rojaXTeam) {
                if (rojaXTeam[l] == jugadores.jugadores[i].idJugador &&
                    amarillasXTeam[k] == jugadores.jugadores[i].idJugador) {
                    var cantRoja = jugadores.jugadores[i].cards.red;
                    jugadores.jugadores[i].cards.red = cantRoja + 1;
                    newAmonestado.teamId = jugadores.idTeam;
                    newAmonestado.apellido = jugadores.jugadores[i].apellido;
                    newAmonestado.nombre = jugadores.jugadores[i].nombre;
                    newAmonestado.roja = newAmonestado.roja + 1;
                    amonestadosXTeam.push(newAmonestado);
                    amonestados.push(newAmonestado);
                    l++
                    k++;
                }
            } if (amarillasXTeam) {
                if (amarillasXTeam[k] == jugadores.jugadores[i].idJugador) {
                    var cantAmarilla = jugadores.jugadores[i].cards.yellow;
                    jugadores.jugadores[i].cards.yellow = cantAmarilla + 1;
                    newAmonestado.teamId = jugadores.idTeam;
                    newAmonestado.apellido = jugadores.jugadores[i].apellido;
                    newAmonestado.nombre = jugadores.jugadores[i].nombre;
                    newAmonestado.amarilla = newAmonestado.amarilla + 1;
                    amonestadosXTeam.push(newAmonestado);
                    amonestados.push(newAmonestado);
                    k++;
                }

            } if (rojaXTeam) {
                if (rojaXTeam[l] == jugadores.jugadores[i].idJugador) {
                    var cantRoja = jugadores.jugadores[i].cards.red;
                    jugadores.jugadores[i].cards.red = cantRoja + 1;
                    newAmonestado.teamId = jugadores.idTeam;
                    newAmonestado.apellido = jugadores.jugadores[i].apellido;
                    newAmonestado.nombre = jugadores.jugadores[i].nombre;
                    newAmonestado.roja = newAmonestado.roja + 1;
                    amonestadosXTeam.push(newAmonestado);
                    amonestados.push(newAmonestado);
                    l++
                }
            }
        }
        dbJson.setUsers(amonestados_db,amonestados);
    }
}
