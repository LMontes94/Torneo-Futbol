const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.get('/posiciones',dataController.position);
router.get('/fixture',dataController.calendar);
router.get('/planteles',dataController.squads);
router.get('/fairplay',dataController.cards);
router.get('/estadisticas',dataController.statistics);

module.exports = router;