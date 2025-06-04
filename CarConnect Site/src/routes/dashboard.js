var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/dashboardController');


router.get('/dashboard/:idUsuario', dashboardController.obterKPIs);

router.get('/grafico/:idUsuario', dashboardController.obterDadosGrafico);

module.exports = router;