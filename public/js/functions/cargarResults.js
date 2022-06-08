const path = require('path');
const dbJson = require('../../../src/databaseJSON/database');

const fixture_db = path.resolve(__dirname, '../../../src/databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../../../src/databaseJSON/teams.json');

module.exports = {
    cargarResults: (posFixture, posPartido) => {
        var fixture = dbJson.getUsers(fixture_db);
        var teams = dbJson.getUsers(teams_db);

        debugger;
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].pj++;
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].pj++;
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gaf =  parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gaf) + parseInt(fixture[posFixture].partidos[posPartido].golteam1);
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gaf = parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gaf) + parseInt(fixture[posFixture].partidos[posPartido].golteam2);
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gec =  parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gec) + parseInt(fixture[posFixture].partidos[posPartido].golteam2);
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gec = parseInt(teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gec) + parseInt(fixture[posFixture].partidos[posPartido].golteam1);
            teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].df =
                teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gaf - teams[(fixture[posFixture].partidos[posPartido].equipo1) - 1].gec;
            teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].df =
                teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gaf - teams[(fixture[posFixture].partidos[posPartido].equipo2) - 1].gec;
            console.log((fixture[posFixture].partidos[posPartido].golteam1))
            console.log(fixture[posFixture].partidos[posPartido].golteam2)
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
        teams = dbJson.setUsers(teams_db, teams);
    }
}
