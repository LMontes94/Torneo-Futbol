const fs = require("fs");
const path = require('path');

module.exports = {
    getUsers: (dataBase) => {
        let dbJSON = fs.readFileSync(dataBase, { encoding: 'utf-8' });
        let db;
        if (dbJSON == "") {
            db = [];
        } else {
            db = JSON.parse(dbJSON);
        }
        return db
    },
    setUsers: (dataBase,data) => {
        fs.writeFileSync(
            dataBase,
            JSON.stringify(data, null, 2),
        );
    },
};