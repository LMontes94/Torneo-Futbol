const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

router.get('/',mainController.home);
router.get('/rules',mainController.rules);
router.get('/info',mainController.info);


module.exports = router;