const path =require('path');
const dbJson = require('../../../src/databaseJSON/database');

const fixture_db = path.resolve(__dirname, '../../../src/databaseJSON/fixture.json');
const teams_db = path.join(__dirname, '../../../src/databaseJSON/teams.json');

module.exports = {
    cargarResults: () => {
        const fixture = dbJson.getUsers(fixture_db);
        const teams = dbJson.getUsers(teams_db);

        for (let i = 0; i > fixture.length; i++) {
            for (let j = 0; j > fixture[i].partidos.length; j++) {
                fixture[i].partidos[j].golteam1
                if (fixture[i].partidos[j].golteam1 != "" && fixture[i].partidos[j].golteam2 != "") {
                    teams[fixture[i].partidos[j].equipo1].pj++;
                    teams[fixture[i].partidos[j].equipo2].pj++;
                    teams[fixture[i].partidos[j].equipo1].gaf = fixture[i].partidos[j].golteam1;
                    teams[fixture[i].partidos[j].equipo2].gaf = fixture[i].partidos[j].golteam2;
                    teams[fixture[i].partidos[j].equipo1].gec = fixture[i].partidos[j].golteam2;
                    teams[fixture[i].partidos[j].equipo2].gec = fixture[i].partidos[j].golteam1;
                    teams[fixture[i].partidos[j].equipo1].df = teams[fixture[i].partidos[j].equipo1].gaf - teams[fixture[i].partidos[j].equipo1].gec;
                    teams[fixture[i].partidos[j].equipo2].df = teams[fixture[i].partidos[j].equipo2].gaf - teams[fixture[i].partidos[j].equipo2].gec;

                    if (fixture[i].partidos[j].golteam1 === fixture[i].partidos[j].golteam2) {
                        teams[fixture[i].partidos[j].equipo1].e++;
                        teams[fixture[i].partidos[j].equipo2].e++;

                        teams[fixture[i].partidos[j].equipo1].points++;
                        teams[fixture[i].partidos[j].equipo2].points++;
                    } else if (fixture[i].partidos[j].golteam1 > fixture[i].partidos[j].golteam2) {
                        teams[fixture[i].partidos[j].equipo1].g++;
                        teams[fixture[i].partidos[j].equipo2].p++;
                        teams[fixture[i].partidos[j].equipo1].points = teams[fixture[i].partidos[j].equipo1].points + 3;
                    } else {
                        teams[fixture[i].partidos[j].equipo2].g++;
                        teams[fixture[i].partidos[j].equipo1].p++;
                        teams[fixture[i].partidos[j].equipo2].points = teams[fixture[i].partidos[j].equipo2].points + 3;
                    }
                }
            }
        }
        dbJson.setUsers(teams_db,teams);
    }
}