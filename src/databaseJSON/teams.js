const fs = require("fs");
const path = require('path');

const teams_db = path.resolve(__dirname, './teams.json');

module.exports = {
    getUsers: () => {
        let teamsJSON = fs.readFileSync(teams_db, { encoding: 'utf-8' });
        let teams;
        if (teamsJSON == "") {
            teams = [];
        } else {
            teams = JSON.parse(teamsJSON);
        }
        return teams
    },
    setUsers: (data) => {
        fs.writeFileSync(
            teams_db,
            JSON.stringify(data, null, 2),
        );
    },
};