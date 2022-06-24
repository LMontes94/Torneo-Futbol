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


router.get('/resultados/fecha',dataController.fecha);
router.get('/resultados/fecha/:id',dataController.fechaId);
router.get('/resultados/fecha/:id/:idMatch',dataController.matchsId);
router.post('/resultados/fecha/:id/:idMatch',dataController.saveMatchs);
router.get('/resultados/fecha/:id/:idMatch/edit',dataController.showMatch);
router.get('/resultados/agregar',dataController.agregarFecha);
router.post('/resultados/agregar',dataController.cargarFecha);
//router.put('/resultados/fecha/:id/:idMatch/edit',dataController.editMatchs);

router.get('/equipos/:id/edit',dataController.editSquad);
//router.put('/equipos/:id',dataController.actualizarSquad);
//router.post('/equipos/create',dataController.crearTeam);
//router.delete('/equipos/:id', dataController.deleteTeam);
module.exports = router;