var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/dashboardController');


router.get('/dashboard/:idUsuario', dashboardController.obterKPIs);


module.exports = router;