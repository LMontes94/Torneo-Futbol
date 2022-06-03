const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.get('/posiciones',dataController.position);
router.get('/fixture',dataController.calendar);
router.get('/equipos',dataController.teams);
router.get('/fairplay',dataController.cards);
router.get('/estadisticas',dataController.statistics);
router.get('/resultados',dataController.results);
router.get('/equipos/:id',dataController.squad)
module.exports = router;