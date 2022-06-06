const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.get('/posiciones',dataController.position);
router.get('/fixture',dataController.calendar);
router.get('/equipos',dataController.teams);
router.get('/fairplay',dataController.cards);
router.get('/estadisticas',dataController.statistics);
router.get('/resultados',dataController.results);
router.get('/equipos/:id',dataController.squad);

//router.put('/equipos/:id',dataController.editSquad);
//router.post('/equipos',dataController.crearTeam);
//router.delete('/equipos', dataController.deleteTeam);
router.get('/resultados/fecha',dataController.fecha);
router.get('/resultados/fecha/:id',dataController.fechaId);
router.get('/resultados/fecha/:id/:idMatch',dataController.matchsId);
router.put('/resultados/fecha/:id/:idMatch',dataController.saveMatchs);
module.exports = router;